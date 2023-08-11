import Block from "../../utilities/block";
import template from "./chat.hbs";
import { messageFrom } from '../messageFrom/messageFrom';
import { messageTo } from '../MessageTo/MessageTo';
import { InputContainer } from '../InputContainer/inputContainer';
import { handleFormSubmit, validationCheck } from '../../utilities/validation';
import { subMenuItem } from '../addUserInChat/addUserInChat';
import { chatModal } from '../chatModal/chatModal';
import ChatAPI from '../../controllers/chat-api';
import { Form } from '../form/form';
import { Button } from '../button/button';
import AuthApi from '../../controllers/auth-api';
import ChatApi from '../../controllers/chat-api';
import UserAPI from '../../controllers/user-api';
import store, { connect } from '../../utilities/store';

interface ChatProps {}

export class Chat extends Block {
    constructor(props: ChatProps) {
        super('div',props);
    }
    getActiveMessage() {
        const activeMessages = this.props;

        console.log(activeMessages);
        // if (!activeMessages) {
        //     return;
        // }
        // this.children.userMessages = activeMessages.map((message) => {
        //     let currentTime;
        //
        //     return new messageFrom({
        //         text: `${message.content}`,
        //         time: `${message.time}`,
        //         // isOwnUserMessage: `${this.props.store.state.user?.id === message.user_id ? "active": ""}`
        //     });
        // });
    }
    init() {
        this.setProps({ currentChat: this.props });
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

        const activeMessages = store.getState().lastMessage;

        console.log(activeMessages);
        // if (!activeMessages) {
        //     return;
        // }
        // this.children.userMessages =

        //
        // this.children.messageFrom1 = new messageFrom({
        //     text: "Привет! Смотри, тут всплыл интересный кусок лунной\n" +
        //       "                            космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC\n" +
        //       "                            для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову\n" +
        //       "                            говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с\n" +
        //       "                            собой забрали только кассеты с пленкой.\n" +
        //       "\n" +
        //       "                            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так\n" +
        //       "                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на\n" +
        //       "                            аукционе за 45000 евро.",
        //     time: "9:01"
        // });
        // this.children.messageFrom2 = new messageFrom({
        //     text: "Окончательная визуализация должна быть готова до конца\n" +
        //       "        четвёртого спринта, то есть именно тогда проект должен выглядеть как ваш прототип.",
        //     time: "9:03"
        // });
        // this.children.messageTo1 = new messageTo({
        //     text: "Круто!",
        //     time: "9:03"
        // });
        // this.children.messageTo2 = new messageTo({
        //     text: "Выбор за вами.",
        //     time: "9:05"
        // });
        // this.children.messageTo3 = new messageTo({
        //     text: "Если ваш дизайн предполагает наличие модульных окон, которые\n" +
        //       "                            в этом спринте никак не используются, делать их сейчас необязательно.",
        //     time: "9:10"
        // });
        // this.children.inputFile = new InputContainer({
        //     class: "form-input",
        //     classInput: 'addMessage addFile',
        //     // placeholder:"Выберите файл",
        //     type: "file",
        //     classLbl: 'chat-addFile',
        //     // classInput: 'addMessage',
        //     events: {
        //         blur: (e: FocusEvent) => {
        //             // validationCheck(e);
        //             console.log(e);
        //             // ChatAPI.sendMessage(e);
        //         }
        //     },
        // }),
        this.children.inputMessage = new InputContainer({
            class: 'form-input inputMessage',
            classInput: 'addMessage',
            name: "message",
            type: 'text',
            value:"",
            events: {
                blur: (e: FocusEvent) => {
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
                    if(input!.value) {
                        console.log("на не пустую строку");
                        ChatAPI.sendMessage(input!.value);

                    } else {
                        console.log("строка пустая");
                    }
                    input.value = "";


                    // const formData = new FormData();
                    // if(input) {
                    //     const data = input!.files[0];
                    //     console.log(data);
                    //     formData.append("avatar", data);
                    //     UserAPI.changeAvatar(formData);
                    // }
                }
            }
        });
    }
    render() {
        this.getActiveMessage();
        return this.compile(template, this.props);
    }
}
