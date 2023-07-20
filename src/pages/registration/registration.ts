import './registration.scss';
import template from "./registration.hbs";
import Block from '../../utilitis/block';
import { Button } from "../../partials/button/button";
import { InputContainer } from "../../partials/InputContainer/inputContainer";

export class RegistrationPage extends Block {
    constructor() {
        super();
    }
    init() {
        this.children.inputEmail = new InputContainer({
            name: "email",
            type:'email',
            class:'form-registration_input',
            text:'Почта'
        });
        this.children.inputLogin = new InputContainer({
            name: "login",
            type:'text',
            class:'form-registration_input',
            text:'Логин'
        });
        this.children.inputName = new InputContainer({
            name: "first_name",
            type:'text',
            class:'form-registration_input',
            text:'Имя'
        });
        this.children.inputSecondName = new InputContainer({
            name: "second_name",
            type:'text',
            class:'form-registration_input',
            text:'Фамилия'
        });
        this.children.inputPhone = new InputContainer({
            name: "phone",
            type:'tel',
            class:'form-registration_input',
            text:'Телефон'
        });
        this.children.inputPassword = new InputContainer({
            name: "password",
            type:'text',
            class:'form-registration_input',
            text:'Пароль',
        });
        this.children.inputNewPassword = new InputContainer({
            name: "password",
            type:'text',
            class:'form-registration_input',
            text:'Пароль (еще раз)',
        });
        this.children.buttonRegistration = new Button({
            name: "Зарегистрироваться",
        });
    }
    render() {
        return this.compile(template, this.props );
    }
}