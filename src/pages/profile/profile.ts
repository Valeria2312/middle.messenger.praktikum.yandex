import './profile.scss';
import Block from "../../utilities/block";
import template from "./profile.hbs";
import {Form} from "../../partials/form/form";
import {Link} from "../../partials/link/link";
import store, { connect } from '../../utilities/store';
import { InputContainer } from '../../partials/InputContainer/inputContainer';
import { Avatar } from '../../partials/avatar/avatar';
import { Modal } from '../../partials/modal/modal';
import AuthApi from '../../controllers/auth-api';
import { Button } from '../../partials/button/button';

export class ProfilePage extends Block {
    constructor() {
        super();
        AuthApi.getUser();
    }
    init() {
        this.children.avatar = new Avatar({
            name: store.getState().user,
            srcImage:`https://ya-praktikum.tech/api/v2/resources${store.getState().avatar}`,
            events: {
                click: () => {
                    this.children.modal.show();
                }
            }
        });
        this.children.modal = new Modal({
            title: "Загрузите файл",

        });
        this.children.form = new Form({
            formClass:'form-info',
            children: [
                new InputContainer({
                    class:'form-input',
                    text: "Почта",
                    name: "email",
                    type: "email",
                    value: store.getState().email,
                    readonly: true,
                }),
                new InputContainer({
                    class:'form-input',
                    text: "Логин",
                    name: "login",
                    type: "text",
                    value: store.getState().login,
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя",
                    name: "first_name",
                    type: "text",
                    value: store.getState().first_name,
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Фамилия",
                    name: "second_name",
                    type: "text",
                    value: store.getState().second_name,
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя в чате",
                    name: "chat_name",
                    type: "text",
                    value: store.getState().display_name || "",
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Телефон",
                    name: "phone",
                    type: "text",
                    value: store.getState().phone,
                    readonly: true,
                }),
                new Link({
                    href: "/profileData",
                    classLink: "form-info-title-link",
                    title: "Изменить данные",
                }),
                new Link({
                    href: "/profilePassword",
                    classLink: "form-info-title-link",
                    title: "Изменить пароль",
                }),
            ],
        });
        this.children.buttonExit = new Button({
            name: "Выйти",
            events: {
                click: () => {
                    AuthApi.logout();
                }
            },
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}

function mapStateToProps(state: any) {
    return state;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const withUser = connect(ProfilePage, mapStateToProps);
