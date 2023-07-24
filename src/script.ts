import './style.css';

import Handlebars from 'handlebars';
import inputPartial from './partials/input/input.hbs'
import inputContainerPartial from './partials/InputContainer/inputContainer.hbs';
import buttonPartial from './partials/button/button.hbs';
import errorPartial from './partials/error/error.hbs';
import linkPartial from './partials/link/link.hbs'
import chatPartial from './partials/chat/chat.hbs'
import chatItemPartial from './partials/chatItem/chatsItem.hbs'

Handlebars.registerPartial('input', inputPartial)
Handlebars.registerPartial('inputContainer', inputContainerPartial)
Handlebars.registerPartial('button', buttonPartial)
Handlebars.registerPartial('button', errorPartial)
Handlebars.registerPartial('link', linkPartial)
Handlebars.registerPartial('chat', chatPartial)
Handlebars.registerPartial('chatItem', chatItemPartial)

import {renderDom} from "./utilities/renderDOM";
import {LoginPage} from "./pages/login/login";
import {RegistrationPage} from "./pages/registration/registration";
import {ErrorPage} from "./pages/error/error";
import {ProfilePage} from "./pages/profile/profile";
import {ProfileDataChangePage} from './pages/profile/profileDataChange/profileDataChange'
import {ProfilePasswordChangePage} from './pages/profile/profilePasswordChange/profilePasswordChange'
import {ChatsPage} from "./pages/chats/chats";



window.addEventListener("DOMContentLoaded", () => {
    const login = new LoginPage();
    const registration = new RegistrationPage();
    const error = new ErrorPage();
    const profile = new ProfilePage();
    const profileData = new ProfileDataChangePage();
    const profilePassword = new ProfilePasswordChangePage();
    const chats = new ChatsPage();

    switch (window.location.pathname) {
        case "/login": {
            renderDom("app", login);
            break;
        }
        case "/registration": {
            renderDom("app", registration);
            break;
        }
        case "/error": {
            renderDom("app", error);
            break;
        }
        case "/profile": {
            renderDom("app", profile);
            break;
        }
        case "/profileData": {
            renderDom("app", profileData);
            break;
        }
        case "/profilePassword": {
            renderDom("app", profilePassword);
            break;
        }
        case "/chat": {
            renderDom('app', chats);
            break
        }
        default: {
            renderDom("app", login);
        }
    }
});
