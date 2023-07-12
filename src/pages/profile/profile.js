import './profile.scss'
export default () => {
    return `<main class='profile'>
    <div class='profile__wrapper'>
        <div class='profile__link'>
            <a href='../chats/chats.html' class='profile__linkToChat'></a>
        </div>
        <div class='profile__info'>
            <div class='profile__info-avatar'>
                <!--                <img src="" alt="Аватар">-->
            </div>
            <div class="profile__info-name">Иван</div>
            <div class='form-info'>
                <div class='form-info__input'>
                    <div class='form-info-title'>Почта</div>
                    <input
                            name='email'
                            type='login'
                            class='form-info__box'
                            value='pochta@yandex.ru'
                    />
                </div>

                <div class='form-info__input'>
                    <div class='form-info-title'>Логин</div>
                    <input
                            name='login'
                            type='text'
                            class='form-info__box'
                            value='ivanivanov'
                    />
                </div>

                <div class='form-info__input'>
                    <div class='form-info-title'>Имя</div>
                    <input
                            name='first_name'
                            type='text'
                            class='form-info__box'
                            value='Иван'
                    />
                </div>

                <div class='form-info__input'>
                    <div class='form-info-title'>Фамилия</div>
                    <input
                            name='second_name'
                            type='text'
                            class='form-info__box'
                            value='Иванов'
                    />
                </div>

                <div class='form-info__input'>
                    <div class='form-info-title'>Имя в чате</div>
                    <input
                            name='display_name'
                            type='text'
                            class='form-info__box'
                            value='Иван'
                    />
                </div>
                <div class='form-info__input'>
                    <div class='form-info-title'>Телефон</div>
                    <input
                            name='phone'
                            type='text'
                            class='form-info__box'
                            value='+7 (909) 967 30 30'
                    />
                </div>

                <div class="links">
                    <div class='form-info__input'>
                        <a href="profileDataChange.html" class='form-info-title-link'>Изменить данные</a>
                    </div>
                    <div class='form-info__input'>
                        <a href="profilePasswordChange.html" class='form-info-title-link'>Изменить данные</a>
                    </div>
                    <div class='form-info__input'>
                        <a href="" class='form-info-title-exit'>Выйти</a>
                    </div>
                </div>
            </div>

        </div>
    </div>

</main>`;
}