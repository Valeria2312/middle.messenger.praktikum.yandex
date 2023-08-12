import Block from "../../../utilities/block";
import {Form} from "../../../partials/form/form";
import template from "./profileDataChange.hbs";
import {Button} from "../../../partials/button/button";
import { handleFormSubmit, validationCheck } from '../../../utilities/validation';
import { InputContainer } from '../../../partials/InputContainer/inputContainer';
import UserAPI from '../../../controllers/user-api';

export class ProfileDataChangePage extends Block {
    constructor() {
        super();
    }
    init() {
        super.init();
        this.children.form = new Form({
            formClass:'form-dataChange',
            events: {
                submit: (e) => {const changeData = handleFormSubmit(e);
                    if(changeData)
                        UserAPI.changeProfile(changeData);
                },
            },
            children: [
                new InputContainer({
                    class:'form-input',
                    text: "Почта",
                    name: "email",
                    type: "email",
                    value:"",
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),
                new InputContainer({
                    class:'form-input',
                    text: "Логин",
                    name: "login",
                    type: "text",
                    value: "",
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя",
                    name: "first_name",
                    type: "text",
                    value: "",
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Фамилия",
                    name: "second_name",
                    type: "text",
                    value:'',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя в чате",
                    name: "display_name",
                    type: "text",
                    value: "",
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); }
                    },
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Телефон",
                    name: "phone",
                    type: "text",
                    value: "",
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
