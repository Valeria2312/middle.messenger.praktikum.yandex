import './chats.scss';
import template from "./chats.hbs";
import Block from '../../utilities/block';
import {ChatItem} from "../../partials/chatItem/chatItem";
import store, { connect } from '../../utilities/store';
import { chatModal } from '../../partials/chatModal/chatModal';
import { SubMenuItem } from '../../partials/addUserInChat/addUserInChat';
import { handleFormSubmit } from '../../utilities/validation';
import ChatAPI from '../../controllers/chat-api';
import { InputContainer } from '../../partials/InputContainer/inputContainer';
import { Button } from '../../partials/button/button';
import { MessageTo } from '../../partials/MessageTo/MessageTo';

interface ChatProps {}
class ChatsPage extends Block {
    constructor(props: ChatProps) {
        super('div',props);
        ChatAPI.getChats();

        if (this.props.currentChat) {
            this.setProps({chatId: this.props.currentChat!.id});
            this.setProps({currentChat:this.props.currentChat});
        }
    }
    updateChatItem() {
        const chats = this.props.chats;
        if (!chats) {
            return;
        }

        this.children.chatItems = chats.map((chat: any) => {
            return new ChatItem({
                name: chat.title,
                // content: chat.avatar,
                class: "chat__info-avatar",
                srcImage: chat.avatar,
                time: '10:49',
                count: chat.unread_count,
                events: {
                    click: (e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        store.getState().lastMessage = [];
                        ChatAPI.socketConnection(chat.id);
                        store.set("activeChat",chat);
                        this.setProps({chatId: chat.id});
                        this.setProps({currentChat: chat});
                        ChatAPI.getChats();
                    }
                }
            });

        });
    }
    updateCurrentMessage() {
        const lastMessage = this.props.lastMessage;
        if (!lastMessage) {
            return;
        }
        this.children.userMessages = lastMessage.map((message:any) => {

            return new MessageTo({
                text: `${message.content}`,
                time: `${message.time}`,
            });
        });
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
                    console.log(e);
                    const chatData = handleFormSubmit(e);
                    console.log(chatData);
                    ChatAPI.createChat(chatData);
                    this.children.modalAddChat.hide();
                }
            }
        });

        this.children.modaladdUserInChat = new chatModal({
            title: "Добавить пользователя",
            name: "login",
            type: "text",
            placeholder: "Введите логин пользователя",
            nameBtn: "Добавить",
            events: {
                submit: (e) => {
                    let chatData = handleFormSubmit(e);
                    chatData = Object.assign(chatData, { 'chatId': this.props.chatId});
                    ChatAPI.addUsersToChat(chatData);
                    this.children.modaladdUserInChat.hide();

                }
            }

        });
        this.children.modalDeleteChat = new chatModal({
            title: "Удалить этот чат?",
            name: "chatId",
            type: "text",
            placeholder: "Введите id чата",
            nameBtn: "Удалить",
            events: {
                submit: () => {
                    const chatData = this.props.chatId;
                    ChatAPI.deleteChat(this.props.chatId);
                    this.children.modalDeleteChat.hide();

                }
            }
        });
        this.children.modalDeleteUser = new chatModal({
            title: "Удалить пользователя",
            name: "login",
            type: "text",
            placeholder: "Введите логин пользователя",
            nameBtn: "Удалить",
            events: {
                submit: (e) => {
                    let chatData = handleFormSubmit(e);
                    chatData = Object.assign(chatData, { 'chatId': this.props.id });
                    ChatAPI.deleteUsers(chatData);
                    this.children.modalDeleteUser.hide();

                }
            }
        });
        this.children.addChat = new SubMenuItem({
            text: "Добавить чат",
            events: {
                click:() => {
                    this.children.modalAddChat.show();
                }
            }
        });
        this.children.addUserInChat = new SubMenuItem({
            text: "Добавить пользователя",
            events: {
                click: () => {
                    this.children.modaladdUserInChat.show();
                }
            }
        });
        this.children.deleteChat = new SubMenuItem({
            text: "Удалить чат",
            events: {
                click: () => {
                    this.children.modalDeleteChat.show();
                }
            }
        });
        this.children.deleteUser = new SubMenuItem({
            text: "Удалить пользователя",
            events: {
                click: () => {
                    this.children.modalDeleteUser.show();
                }
            }
        });

        this.children.inputMessage = new InputContainer({
            class: 'form-input inputMessage',
            classInput: 'addMessage',
            name: "message",
            type: 'text',
            value:"",
        }),
        this.children.button = new Button({
            class: "chat-pushNewMessage",
            events: {
                click: () => {
                    const input = document.querySelector(".addMessage");
                    if (input!.value) {
                        ChatAPI.sendMessage(input!.value);

                    } else {
                        console.log("строка пустая");
                    }
                    input.value = "";
                }}});
    }
    render() {
        this.updateChatItem();
        this.updateCurrentMessage();
        return this.compile(template, this.props);
    }
}
function mapStateToProps(state: any) {
    return [ state.chats,
        state.lastMessage] ?? [];
}

export default connect(mapStateToProps)(ChatsPage);
