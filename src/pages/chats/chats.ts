import './chats.scss';
import template from "./chats.hbs";
import Block from '../../utilities/block';
import {ChatItem} from "../../partials/chatItem/chatItem";
import {Chat} from "../../partials/chat/chat";
import store, { connect } from '../../utilities/store';
import { chatModal } from '../../partials/chatModal/chatModal';
import { subMenuItem } from '../../partials/addUserInChat/addUserInChat';
import { handleFormSubmit } from '../../utilities/validation';
import ChatAPI from '../../controllers/chat-api';

interface ChatProps {}
class ChatsPage extends Block {
    constructor(props: ChatProps) {
        super('div',props);

    }
    init() {
        ChatAPI.getChats();
        console.log(this.props);
        // console.log();
        this.children.modalAddChat = new chatModal({
            title: "Добавить чат",
            name: "title",
            type: "text",
            placeholder: "Введите назване чата",
            nameBtn: "Сохранить",
            events: {
                submit: (e) => {
                    const chatData = handleFormSubmit(e);
                    console.log(chatData);
                    ChatAPI.createChat(chatData);
                    this.children.modalAddChat.hide();
                }
            }
        });
        this.children.addChat = new subMenuItem({
            text: "Добавить чат",
            events: {
                click:() => {
                    this.children.modalAddChat.show();
                }
            }
        });

        //так работает

        // const user = store.getState('chats');
        // console.log(user);
        //

        const chatsResult: Array<Block> = [];
        const fullChats = store.getState('chats');
        console.log(fullChats);
        fullChats.forEach((item) => {
            const chat = new ChatItem({
                name: item.title,
                content: item.avatar,
                time: '10:49',
                count: item.unread_count,
                events: {
                    click: async () => {
                        // console.log("событие на элементе чата", item);
                        store.set("currentChat",item);
                    }
                }
            });
            chatsResult.push(chat);
        });
        // console.log(store.getState("currentChat").id);
        this.children.chatItems = chatsResult;
        this.children.currentChat = new Chat({});
    }
    render() {
        return this.compile(template, this.props);
    }
}
//это по сути тоже store
const get = store.getState('chats');
// console.log(get);

function mapStateToProps(state) {
    console.log(state);
    return state;
}

export default connect(mapStateToProps)(ChatsPage);
