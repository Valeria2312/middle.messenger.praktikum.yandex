import { collectData } from './collectData';

export type TUser = {
  first_name?:string,
  second_name?: string,
  login?: string,
  email?: string,
  password?: string,
  phone?: string
}
interface validInput {
    RegExp: RegExp;
    errorMessage: string;
}

const validDataInputs: Record<string, validInput> = {
    first_name: {
        RegExp: /^[А-ЯA-Z][а-яa-z-]*$/,
        errorMessage:'Заглавная первая буква, без пробелов, цифр, спецсимволов',
    },
    second_name: {
        RegExp: /^[А-ЯA-Z][а-яa-z-]*$/,
        errorMessage:'Заглавная первая буква, без пробелов, цифр, спецсимволов',
    },
    login: {
        RegExp: /^(?!^\d+)[a-zA-Z\d-_]{3,20}$/,
        errorMessage:'Логин от 3 до 20 символов, латиницей, может содержать цифры',
    },
    users: {
        RegExp: /^(?!^\d+)[a-zA-Z\d-_]{3,20}$/,
        errorMessage:'Логин от 3 до 20 символов, латиницей, может содержать цифры',
    },
    title: {
        RegExp: /^$/,
        errorMessage:'Введите название чата',
    },
    chatId: {
        RegExp: /^\d+$/,
        errorMessage:'Может содержать только цифры',
    },
    display_name: {
        RegExp: /^(?!^\d+)[a-zA-Z\d-_]{3,20}$/,
        errorMessage:'Логин от 3 до 20 символов, латиницей, может содержать цифры',
    },
    email: {
        RegExp: /^[A-Za-z\d'-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
        errorMessage:'Введите правильный email',
    },
    password: {
        RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage:'Пароль содержит от 8 до 40 символов, хотя бы одна заглавная буква и цифра',
    },
    oldPassword: {
        RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage:'Пароль содержит от 8 до 40 символов, хотя бы одна заглавная буква и цифра',
    },
    newPassword: {
        RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage:'Пароль содержит от 8 до 40 символов, хотя бы одна заглавная буква и цифра',
    },
    repeatPassword:{
        RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage:'Пароли не совпадают',
    },
    phone: {
        RegExp: /^\+?\d{10,15}$/,
        errorMessage:'Телефон от 10 до 15 символов, может начинается с плюса'
    },
    message: {
        RegExp: /^$/,
        errorMessage:'Сообщение не может быть пустым',
    },
};

export const validationCheck = (elementEvent: Event) => {
    const input = elementEvent.target as HTMLInputElement;
    console.log(input);
    checkValid(input);
};

export const handleFormSubmit = (elementEvent: Event) => {
    elementEvent.preventDefault();
    const formInputs = document.querySelectorAll<HTMLInputElement>(".form-input");
    const data: any = {};
    // console.log(formInputs);
    formInputs.forEach((formInput: HTMLInputElement) => {
        const input = formInput.querySelector('input') as HTMLInputElement;
        // console.log(input);
        checkValid(input,data);
    });
    collectData(data, formInputs);
    // console.log(data);
    return data;
};

function checkValid(input: HTMLInputElement, data?: Record<string, string>) {
    const error = input.parentElement?.querySelector(".error") as HTMLElement;
    const nameInput = validDataInputs[input.name];
    // console.log(nameInput);
    const isValid = nameInput.RegExp.test(input.value);

    if (!isValid) {
        error!.textContent = nameInput.errorMessage;
        error!.style.display = 'block';
    } else {
        error!.textContent = "";
        if (data) {
            data[input.name] = input.value;
        }
    }
}
