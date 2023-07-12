import './style.css';
import Router from "./router.js";
import {LoginPage} from "./pages/login/login.ts";
// import registration from "./pages/registration/registration.js";
// import chats from "./pages/chats/chats.js";
// import profile from "./pages/profile/profile.js";
// import error from "./pages/error/error.js";



console.log('Старт');
window.addEventListener("DOMContentLoaded", (event) => {
    const app = document.getElementById('app');
    if(!app) return;
    const router = new Router(app)

    router
        .add('/',new LoginPage)
        .add('/login', new LoginPage)
        // .add('/registration', registration)
        // .add('/chats', chats)
        // .add('/profile', profile)
        // .add('/error', error)

    router.go(window.location.pathname);
})