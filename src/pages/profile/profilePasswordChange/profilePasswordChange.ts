import Block from "../../../utilitis/block";
import {InputProfile} from "../../../partials/inputProfile/inputProfile";
import template from "./profilePasswordChange.hbs";
import {Form} from "../../../partials/form/form";
import {Button} from "../../../partials/button/button";
// import {Link} from "../../partials/link/link";

export class ProfilePasswordChangePage extends Block {
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
                    title: "Старый пароль",
                    name: "oldPassword",
                    type: "password",
                    value: '•••••••••',
                    // readonly: true,
                }),
                new InputProfile({
                    title: "Новый пароль",
                    name: "newPassword",
                    type: "password",
                    value: '•••••••••',
                    // readonly: true,
                }),

                new InputProfile({
                    title: "Повторите новый пароль",
                    name: "repeat_password",
                    type: "password",
                    value: '•••••••••',
                    // readonly: true,
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