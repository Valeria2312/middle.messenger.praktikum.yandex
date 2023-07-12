import './registration.scss';
export  default () => {
    return `
    <main class='registration'>
    <div class='registration__wrapper'>
        <div class='registration__wrapper-header'>Регистрация</div>
        <form action='#' class='form-registration'>
            <div class="form-registration__inputs">
                {{> input type='email' class='form-registration_input' text='Почта' name='email'}}
                {{> input type='text' class='form-registration_input' text='Логин' name='login'}}
                {{> input type='text' class='form-registration_input' text='Имя' name='first_name'}}
                {{> input type='text' class='form-registration_input' text='Фамилия' name='second_name'}}
                {{> input type='tel' class='form-registration_input' text='Телефон' name='phone'}}
                {{> input type='text' class='form-registration_input' text='Пароль' name='password'}}
                {{> input type='text' class='form-registration_input' text='Пароль (еще раз)' name='password'}}
            </div>
            {{> button name='Зарегистрироваться'}}
            <a href='#' class='form-registration__login'>Войти</a>
        </form>
    </div>
</main>
    `;
}