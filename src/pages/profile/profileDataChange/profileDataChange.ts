import Block from "../../../utilitis/block";
import {Form} from "../../../partials/form/form";
import {InputProfile} from "../../../partials/inputProfile/inputProfile";
import template from "./profileDataChange.hbs";
import {Button} from "../../../partials/button/button";


export class ProfileDataChangePage extends Block {
    constructor() {
        super();
    }
    init() {
        this.children.form = new Form({
            formClass:'form-info',
            // events: {
            //     submit: (event) => handleSubmit(),
            // },
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
                new Button({
                    name:'Сохранить',
                }),
            ],
        });
    }
    render() {
        return this.compile(template, { ...this.props });
    }
}
