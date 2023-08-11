import './chats.scss';
import template from "./chats.hbs";
import Block from '../../utilities/block';
import {ChatItem} from "../../partials/chatItem/chatItem";
// import {Chat} from "../../partials/chat/chat";
import store, { connect } from '../../utilities/store';
import { chatModal } from '../../partials/chatModal/chatModal';
import { subMenuItem } from '../../partials/addUserInChat/addUserInChat';
import { handleFormSubmit } from '../../utilities/validation';
import ChatAPI from '../../controllers/chat-api';
import { InputContainer } from '../../partials/InputContainer/inputContainer';
import { Button } from '../../partials/button/button';
import { messageFrom } from '../../partials/messageFrom/messageFrom';

interface ChatProps {}
class ChatsPage extends Block {
    private messageResult: any;
    constructor(props: ChatProps) {
        super('div',props);
        ChatAPI.getChats();
        this.messageResult = [];
    }
    updateChatItem() {
        const chats = this.props.chats;
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
                        ChatAPI.socketConnection(item.id);
                        store.set("activeChat",item);
                        this.setProps({currentChat: item});
                        // console.log(item.id);
                    }
                }
            });
            chatsResult.push(chat);
        });
        return chatsResult;
    }
    updateCurrentMessage() {
        // const messageResult:Array<Block> = [];
        const lastMessage = this.props.lastMessage;
        if (!lastMessage) {
            return;
        }
        // this.children.activeChat = messageResult;
        // if (!lastMessage) {
        //     return;
        // }
        // console.log(this.messageResult);
        // if(lastMessage) this.messageResult.push(lastMessage);
        // // this.messageResult.push(lastMessage);
        console.log("сообщения в функции",lastMessage.content);
        const array = [];
        array.push(lastMessage);
        console.log(array);
        // this.setProps({messages: [...array, lastMessage]});
        // console.log("аррей сообщений",this.messageResult);
        this.children.activeChat = new messageFrom({
            text: lastMessage.content,
            time: lastMessage.time
        });
        // return chatsResult;
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
        this.children.modaladdUserInChat = new chatModal({
            title: "Добавить пользователя",
            name: "login",
            type: "text",
            placeholder: "Введите логин пользователя",
            nameBtn: "Добавить",
            events: {
                submit: (e) => {
                    let chatData = handleFormSubmit(e);
                    chatData = Object.assign(chatData, { 'chatId': this.props.id });
                    ChatAPI.addUsersToChat(chatData);
                    this.children.modaladdUserInChat.hide();

                }
            }

        });
        this.children.modalDeleteChat = new chatModal({
            title: "Удалить чат",
            name: "chatId",
            type: "text",
            placeholder: "Введите ID чата",
            nameBtn: "Удалить",
            value: this.props.id,
            events: {
                submit: (e) => {
                    const chatData = handleFormSubmit(e);
                    console.log(chatData);
                    ChatAPI.deleteChat(chatData);
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
        this.children.addChat = new subMenuItem({
            text: "Добавить чат",
            events: {
                click:() => {
                    this.children.modalAddChat.show();
                }
            }
        });
        this.children.addUserInChat = new subMenuItem({
            text: "Добавить пользователя",
            events: {
                click: () => {
                    this.children.modaladdUserInChat.show();
                }
            }
        });
        this.children.deleteChat = new subMenuItem({
            text: "Удалить чат",
            events: {
                click: () => {
                    this.children.modalDeleteChat.show();
                }
            }
        });
        this.children.deleteUser = new subMenuItem({
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
            events: {
                blur: () => {
                    // const data = validationCheck(e);
                    // console.log(data);
                    // ChatAPI.sendMessage(e);
                }
            },
        }),
        this.children.button = new Button({
            class: "chat-pushNewMessage",
            events: {
                click: () => {
                    const input = document.querySelector(".addMessage");
                    // console.log('сработало условие',input?.value);
                    if (input!.value) {
                        console.log("на не пустую строку");
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
    // console.log(state.lastMessage);
    return [ state.chats,
        state.lastMessage] ?? [];

    // } ?? {};
    // return state.chats ?? [];
}

export default connect(mapStateToProps)(ChatsPage);
