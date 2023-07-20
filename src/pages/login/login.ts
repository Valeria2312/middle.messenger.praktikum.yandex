import './login.scss';
import template from "./login.hbs";
import Block from '../../utilitis/block';
import { Button } from "../../partials/button/button";
import { InputContainer } from "../../partials/InputContainer/inputContainer";
import {Input} from "../../partials/input/input";
import {validationCheck} from "../../utilitis/validation";


export class LoginPage extends Block {
    constructor() {
        super();
        this._element;
    }
    init() {
        super.init()
        this.children.inputLogin = new InputContainer({
            class:'form-login__login',
            text:'Логин',
            children: [
                new Input({
                    name: "login",
                    type:'text',
                    value: 'ivanivanov',
                    events: {
                        blur: validationCheck(this._element)
                    }
                })
            ],
        });
        this.children.inputPassword = new InputContainer({
            class:'form-login__password',
            text:'Пароль',
            children: [
                new Input({
                    type:'text',
                    name:'password',
                    value: 'ased123',
                })
            ],
        });
        this.children.buttonLogin = new Button({
            name: "Авторизоваться",
        });

    }
    render() {
        const data =  this.compile(template, this.props );
        // validationCheck(data)
        return data;
    }

}