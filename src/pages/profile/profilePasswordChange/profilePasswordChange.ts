import Block from "../../../utilities/block";
import template from "./profilePasswordChange.hbs";
import {Form} from "../../../partials/form/form";
import {Button} from "../../../partials/button/button";
import { InputContainer } from '../../../partials/InputContainer/inputContainer';
import { handleFormSubmit, validationCheck } from '../../../utilities/validation';
import UserAPI from '../../../controllers/user-api';

export class ProfilePasswordChangePage extends Block {
    constructor() {
        super();
    }
    init() {
        this.children.form = new Form({
            formClass:'form-passwordChange',
            events: {
                submit: (e) => {const changePassword = handleFormSubmit(e);
                    if(changePassword)
                        UserAPI.changePassword(changePassword);
                },
            },
            children: [
                new InputContainer({
                    text: "Старый пароль",
                    class:'form-input',
                    name: "oldPassword",
                    type: "password",
                    value: '',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),
                new InputContainer({
                    text: "Новый пароль",
                    class:'form-input',
                    name: "newPassword",
                    type: "password",
                    value: '',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),

                new InputContainer({
                    text: "Повторите новый пароль",
                    class:'form-input',
                    name: "repeatPassword",
                    type: "password",
                    value: '',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),

                new Button({
                    name:'Сохранить',
                }),
            ],
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
