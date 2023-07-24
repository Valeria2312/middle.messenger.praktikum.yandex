import './login.scss';
import template from './login.hbs';
import Block from '../../utilities/block';
import { Button } from '../../partials/button/button';
import { InputContainer } from '../../partials/InputContainer/inputContainer';
import { handleFormSubmit, validationCheck } from '../../utilities/validation';
import { Form } from '../../partials/form/form';
import { Link } from '../../partials/link/link';


export class LoginPage extends Block {
    constructor() {
        super();
    }
    init() {
        super.init()
        this.children.form = new Form({
            formClass: 'form-login',
            events: {
                submit: (e) => { handleFormSubmit(e) },
            },
            children: [
                new InputContainer({
                    class:'form-input',
                    text:'Логин',
                    name: "login",
                    type:'text',
                    value: 'ivanivanov',
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),
                new InputContainer({
                    class:'form-input',
                    text:'Пароль',
                    type:'text',
                    name:'password',
                    value: 'ased123',
                    events: {
                        blur: (e: any) => { validationCheck(e) }
                    },
                }),
                new Button({
                    name: "Авторизоваться",
                }),
                new Link({
                    title: 'Нет аккаунта?',
                    href: '/registration',
                    classLink: 'form-login__backlink',
                }),
            ]
        })
    }
    render() {
        return this.compile(template, this.props);
    }

}
