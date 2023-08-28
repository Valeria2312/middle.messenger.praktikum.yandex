import './registration.scss';
import template from './registration.hbs';
import Block from '../../utilities/block';
import { Button } from '../../partials/button/button';
import { InputContainer } from '../../partials/InputContainer/inputContainer';
import { Form } from '../../partials/form/form';
import { handleFormSubmit, validationCheck } from '../../utilities/validation';
import { Link } from '../../partials/link/link';
import AuthApi from '../../controllers/auth-api';
import router from '../../utilities/router';

export class RegistrationPage extends Block {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.children.form = new Form({
            formClass: 'form-registration',
            events: {
                submit: (e) => {
                    e.preventDefault();
                    const signupData = handleFormSubmit(e);
                    if(signupData) {
                        AuthApi.singUp(signupData)
                            .then(res =>console.log(res));
                        router.go("/profile");
                    }
                },
            },
            children: [
                new InputContainer({
                    name: 'email',
                    type: 'email',
                    class: 'form-input',
                    text: 'Почта',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new InputContainer({
                    name: 'login',
                    type: 'text',
                    class: 'form-input',
                    text: 'Логин',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new InputContainer({
                    name: 'first_name',
                    type: 'text',
                    class: 'form-input',
                    text: 'Имя',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new InputContainer({
                    name: 'second_name',
                    type: 'text',
                    class: 'form-input',
                    text: 'Фамилия',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new InputContainer({
                    name: 'phone',
                    type: 'tel',
                    class: 'form-input',
                    text: 'Телефон',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new InputContainer({
                    name: 'password',
                    type: 'text',
                    class: 'form-input',
                    text: 'Пароль',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new InputContainer({
                    name: 'password',
                    type: 'text',
                    class: 'form-input',
                    text: 'Пароль (еще раз)',
                    events: {
                        blur: (e: FocusEvent) => { validationCheck(e); },
                    },
                }),
                new Button({
                    name: 'Зарегистрироваться',
                }),
                new Link({
                    title: 'Войти',
                    href: '/login',
                    classLink: 'form-registration__loginLink',
                }),
            ],
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
