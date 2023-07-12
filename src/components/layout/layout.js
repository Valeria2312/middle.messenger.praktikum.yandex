import Router from "../../router.js";
import Handlebars from 'handlebars'

const tpl =
    `
<div>
<a href="../../pages/login/login.hbs">Страница входа</a>
    <a href="../../pages/registration/registration.js">Страница регистрации</a>
<a href="../../pages/error/error.js">Страница ошибки</a>
<a href="../../pages/chats/chats.js">Страница чата</a>
<a href="../../pages/profile/profile.js">Страница профиля</a>
</div>
<main>
{{{body}}}
</main>`;

export default (body) => {
    const dom = document.createElement('template');
    dom.innerHTML= Handlebars.compile(tpl)({body});

    const nav = dom.querySelectorAll('a');
    nav.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            Router.do(e.target.getAttribute('href'));
        })
    });
    return dom.content
}