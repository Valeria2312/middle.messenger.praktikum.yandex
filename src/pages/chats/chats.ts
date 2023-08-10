import './chats.scss';
import template from "./chats.hbs";
import Block from '../../utilities/block';
// import {ChatItem} from "../../partials/chatItem/chatItem";
import {Chat} from "../../partials/chat/chat";
import store, { connect } from '../../utilities/store';
import { chatModal } from '../../partials/chatModal/chatModal';
import { subMenuItem } from '../../partials/addUserInChat/addUserInChat';
import { handleFormSubmit } from '../../utilities/validation';
import ChatAPI from '../../controllers/chat-api';

interface ChatProps {}
export class ChatsPage extends Block {
    constructor(props: ChatProps) {
        super('div',props);
        ChatAPI.getChats();
    }
    init() {
        console.log("пропсы тут должны быть из connect",this.props);
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

        console.log("Вывод store.getState() в чатах",store.getState());
        console.log("Вывод store.getState().chats в чатах",store.getState().chats);

        // this.children.chatItems = chatsResult;
        this.children.currentChat = new Chat({});
    }
    render() {
        console.log("пропсы в рендере",this.props);
        // ChatAPI.getChats();
        return this.compile(template, this.props);
    }
}
function mapStateToProps(state: any) {
    console.log("mapStateToProps",state.chats);
    return state.chats;
}

export default connect(mapStateToProps)(ChatsPage);
