import './profile.scss';
import Block from "../../utilities/block";
import {InputProfile} from "../../partials/inputProfile/inputProfile";
import template from "./profile.hbs";
import {Form} from "../../partials/form/form";
import {Link} from "../../partials/link/link";


export class ProfilePage extends Block {
    constructor() {
        super();
    }
    init() {
        this.children.form = new Form({
            formClass:'form-info',
            children: [
                new InputProfile({
                    title: "Почта",
                    name: "email",
                    type: "email",
                    value: "pochta@yandex.ru",
                    readonly: true,
                }),
                new InputProfile({
                    title: "Логин",
                    name: "login",
                    type: "text",
                    value: "ivanivanov",
                    readonly: true,
                }),

                new InputProfile({
                    title: "Имя",
                    name: "first_name",
                    type: "text",
                    value: "Илья",
                    readonly: true,
                }),

                new InputProfile({
                    title: "Фамилия",
                    name: "second_name",
                    type: "text",
                    value: "Иванов",
                    readonly: true,
                }),

                new InputProfile({
                    title: "Имя в чате",
                    name: "chat_name",
                    type: "text",
                    value: "Илья",
                    readonly: true,
                }),

                new InputProfile({
                    title: "Телефон",
                    name: "phone",
                    type: "text",
                    value: "8(985)952-14-00",
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
                new Link({
                    href: "/login",
                    classLink: "form-info-title-exit",
                    title: "Выйти",
                }),
            ],
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}

export default ProfilePage;
