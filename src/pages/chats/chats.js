import './chats.scss';

export default () => {
   return `
<main class='chats'>
    <section class="list-chats">
        <div class="link-profile">
            <a href="#" class="link-profile__link">Профиль</a>
            <img class="link-profile__img" src="image/Polygon%201.svg" alt="Переход на профиль">
        </div>
        <label>
            <input class="list-chats__search" type="text" placeholder='Поиск'>
        </label>
        <div class="list-chats__items">
            {{> chatsItem }}
            {{> chatsItem }}
            {{> chatsItem }}
        </div>
    </section>
    <!--    <section class="chat-message">-->
    <!--&lt;!&ndash;        <div class="chat-message_text">Выберите чат чтобы отправить сообщение</div>&ndash;&gt;-->
    <!--    </section>-->
    <section class="chat-openItem">
        {{> chat }}
    </section>
</main>
    `;
}