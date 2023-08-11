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
        ChatAPI.getChats();
    }
    updateChatItem() {
        const chats = this.props.chats;
        // console.log("чаты в функции",this.props);
        if (!chats) {
            return;
        }
        const chatsResult: Array<Block> = [];
        this.children.chatItems = chatsResult;
        chats.forEach((item) => {
            const chat = new ChatItem({
                name: item.title,
                content: item.avatar,
                time: '10:49',
                count: item.unread_count,
                events: {
                    click: async () => {
                        store.set("activeChat",item);
                        this.setProps({currentChat: item});
                        console.log(item.id);
                        ChatAPI.socketConnection(item.id);
                    }
                }
            });
            chatsResult.push(chat);
        });
        return chatsResult;
    }
    createCurrentChat() {
        console.log("активная чат в функции",this.props.currentChat);
        // console.log("сообщения в функции", this.props);

        const currentChat = this.props.currentChat;
        if (!currentChat) {
            return;
        }
        this.children.currentChat = new Chat(currentChat);
    }
    init() {
        this.children.modalAddChat = new chatModal({
            title: "Добавить чат",
            name: "title",
            type: "text",
            placeholder: "Введите назване чата",
            nameBtn: "Сохранить",
            events: {
                submit: (e) => {
                    const chatData = handleFormSubmit(e);
                    console.log(this.props.chats);
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
        console.log(this.props.chats);
        console.log(store.getState().activeChat);
        // this.children.chatItems = chatsResult;
        // this.children.currentChat = new Chat({});
    }
    render() {
        // console.log("пропсы в рендере",this.props);
        this.updateChatItem();
        this.createCurrentChat();
        return this.compile(template, this.props);
    }
}
function mapStateToProps(state: any) {
    // console.log("mapStateToProps",state);
    return state.chats ?? {};
}

export default connect(mapStateToProps)(ChatsPage);
