import './style.css';

import Handlebars from 'handlebars';
import inputContainerPartial from './partials/InputContainer/inputContainer.hbs';
import buttonPartial from './partials/button/button.hbs';
import errorPartial from './partials/error/error.hbs';
import linkPartial from './partials/link/link.hbs';
import chatPartial from './partials/chat/chat.hbs';
import chatItemPartial from './partials/chatItem/chatsItem.hbs';
import avatarPartial from './partials/avatar/avatar.hbs';
import modalPartial from './partials/modal/modal.hbs';

Handlebars.registerPartial('inputContainer', inputContainerPartial);
Handlebars.registerPartial('button', buttonPartial);
Handlebars.registerPartial('button', errorPartial);
Handlebars.registerPartial('link', linkPartial);
Handlebars.registerPartial('chat', chatPartial);
Handlebars.registerPartial('chatItem', chatItemPartial);
Handlebars.registerPartial('avatar', avatarPartial);
Handlebars.registerPartial('modal', modalPartial);

import {LoginPage} from "./pages/login/login";
import {RegistrationPage} from './pages/registration/registration';
import {ErrorPage} from "./pages/error/error";
import ProfilePage from "./pages/profile/profile";
import ProfileDataChangePage from './pages/profile/profileDataChange/profileDataChange';
import {ProfilePasswordChangePage} from './pages/profile/profilePasswordChange/profilePasswordChange';
import ChatsPage from "./pages/chats/chats";
import Router from './utilities/router';

const login = new LoginPage();
const registration = new RegistrationPage();
const error = new ErrorPage();
const profile = new ProfilePage({title: 'pf'});
const profileData = new ProfileDataChangePage({title: 'pf'});
const profilePassword = new ProfilePasswordChangePage();
const chats = new ChatsPage({title: 'pf'});


window.addEventListener("DOMContentLoaded", () => {

    // const router = new Router("app");

    // Можно обновиться на /user и получить сразу пользователя
    Router
        .use("/", login)
        .use("/login", login)
        .use("/sign-up", registration)
        .use("/error", error)
        .use("/settings", profile)
        .use("/settingsData", profileData)
        .use("/settingsPassword", profilePassword)
        .use("/messenger", chats)
        .start();
});
