import Block from "../../../utilities/block";
import {Form} from "../../../partials/form/form";
import template from "./profileDataChange.hbs";
import {Button} from "../../../partials/button/button";
import { handleFormSubmit, validationCheck } from '../../../utilities/validation';
import { InputContainer } from '../../../partials/InputContainer/inputContainer';


export class ProfileDataChangePage extends Block {
    constructor() {
        super();
    }
    init() {
        super.init()
        this.children.form = new Form({
            formClass:'form-dataChange',
            events: {
                submit: (e) => { handleFormSubmit(e) },
            },
            children: [
                new InputContainer({
                    class:'form-input form-info__box' ,
                    text: "Почта",
                    name: "email",
                    type: "email",
                    value: "pochta@yandex.ru",
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),
                new InputContainer({
                    class:'form-input',
                    text: "Логин",
                    name: "login",
                    type: "text",
                    value: "ivanivanov",
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя",
                    name: "first_name",
                    type: "text",
                    value: "Илья",
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Фамилия",
                    name: "second_name",
                    type: "text",
                    value: "Иванов",
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя в чате",
                    name: "chat_name",
                    type: "text",
                    value: "Илья",
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Телефон",
                    name: "phone",
                    type: "text",
                    value: "8(985)952-14-00",
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
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
