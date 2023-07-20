import Router from "../../router.js";
import Handlebars from 'handlebars'

const tpl =
    `
<div>
<a href="../../pages/login/login.hbs">Страница входа</a>
    <a href="../../pages/registration/registration.ts">Страница регистрации</a>
<a href="../../pages/error/error.ts">Страница ошибки</a>
<a href="../../pages/chats/chats.ts">Страница чата</a>
<a href="../../pages/profile/profile.ts">Страница профиля</a>
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