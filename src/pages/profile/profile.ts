import './profile.scss';
import Block from "../../utilities/block";
import template from "./profile.hbs";
import {Form} from "../../partials/form/form";
import {Link} from "../../partials/link/link";
import store, { connect } from '../../utilities/store';
import { InputContainer } from '../../partials/InputContainer/inputContainer';
import { Avatar } from '../../partials/avatar/avatar';
import { Modal } from '../../partials/modal/modal';
import AuthApi from '../../controllers/auth-api';
import { Button } from '../../partials/button/button';
import { handleFormSubmit } from '../../utilities/validation';
import ChatAPI from '../../controllers/chat-api';
import UserAPI from '../../controllers/user-api';


interface ProfileProps {}
class ProfilePage extends Block {
    constructor(props:ProfileProps) {
        super('div',props);
        AuthApi.getUser();
    }
    updateUser() {
        const user = this.props.user;
        console.log(user);
        if (!user) {
            return;
        }
        this.children.avatar = new Avatar({
            name: this.props.user?.display_name || "",
            srcImage:`https://ya-praktikum.tech/api/v2/resources/${this.props.user?.avatar}`,
            class: "profile__info-avatar",
            events: {
                click: () => {
                    this.children.modal.show();
                }
            }
        });
        this.children.modal = new Modal({
            // title: "Загрузите файл",
            title: "Загрузите файл",
            name: "file",
            type: "file",
            placeholder: "Выберите файл",
            nameBtn: "Сохранить",
        });
        this.children.form = new Form({
            formClass:'form-info',
            children: [
                new InputContainer({
                    class:'form-input',
                    text: "Почта",
                    name: "email",
                    type: "email",
                    value: this.props.user?.email || "",
                    readonly: true,
                }),
                new InputContainer({
                    class:'form-input',
                    text: "Логин",
                    name: "login",
                    type: "text",
                    value: this.props.user?.login || "",
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя",
                    name: "first_name",
                    type: "text",
                    value: this.props.user?.first_name || "",
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Фамилия",
                    name: "second_name",
                    type: "text",
                    value: this.props.user?.second_name || "",
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Имя в чате",
                    name: "chat_name",
                    type: "text",
                    value: this.props.user?.display_name || "",
                    readonly: true,
                }),

                new InputContainer({
                    class:'form-input',
                    text: "Телефон",
                    name: "phone",
                    type: "text",
                    value: this.props.user?.phone || "",
                    readonly: true,
                }),
                new Link({
                    href: "/settingsData",
                    classLink: "form-info-title-link",
                    title: "Изменить данные",
                }),
                new Link({
                    href: "/settingsPassword",
                    classLink: "form-info-title-link",
                    title: "Изменить пароль",
                }),
            ],
        });
        this.children.buttonExit = new Button({
            name: "Выйти",
            events: {
                click: () => {
                    AuthApi.logout();
                }
            },
        });
    }
    // init() {
    //     console.log(this.props.user?.avatar);
    // }
    render() {
        this.updateUser();
        console.log("в рендере",this.props);
        return this.compile(template, this.props);
    }
}

function mapStateToProps(state: any) {
    return state.user ?? [];
}

export default connect(mapStateToProps)(ProfilePage);
