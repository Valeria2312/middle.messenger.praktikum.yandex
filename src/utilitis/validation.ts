// interface validInput {
//     RegExp: RegExp;
//     errorMessage: string;
// }

// const validDataInputs: Record<string, validInput> = {
//     first_name: {
//         RegExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
//         errorMessage:'Заглавная первая буква, без пробелов, цифр, спецсимволов',
//     },
//     second_name: {
//         RegExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
//         errorMessage:'Заглавная первая буква, без пробелов, цифр, спецсимволов',
//     },
//     login: {
//         RegExp: /^(?!^\d+)[a-zA-Z0-9-_]{3,20}$/,
//         errorMessage:'Логин от 3 до 20 символов, латиницей, может содержать цифры',
//     },
//     email: {
//         RegExp: /^[A-Za-z0-9-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
//         errorMessage:'Введите правильный email',
//     },
//     password: {
//         RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
//         errorMessage:'Пароль содержит от 8 до 40 символов, хотя бы одна заглавная буква и цифра',
//     },
//     newPassword: {
//         RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
//         errorMessage:'Пароль содержит от 8 до 40 символов, хотя бы одна заглавная буква и цифра',
//     },
//     repeat_password:{
//         RegExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
//         errorMessage:'Пароли не совпадают',
//     },
//     phone: {
//         RegExp: /^\+?[0-9]*$/,
//         errorMessage:'Телефон от 10 до 15 символов, может начинается с плюса'
//     },
//     message: {
//         RegExp: /^$/,
//         errorMessage:'Сообщение не может быть пустым',
//     },
// }

export function validationCheck(element: any) {
    console.log(element);
    const formInputs = element.querySelector('.form-input');

    console.log(formInputs);
}




// export function validationCheck(data:any) {
//     let a =  [...data.querySelectorAll('.form-input')];
//     for(var i = 0; i < a.length; i++) {
//         a[i].addEventListener("blur", log);
//     }
//
// }
// function log() {
//     console.log("sdddd")
// }
