import './login.scss';
import template from "./login.hbs";
import Block from '../../utilitis/block';
// import { Button } from "../../partials/button";

export class LoginPage extends Block {
    constructor() {
        super('div');
    }
    // init() {
    //     this.children.buttonLogin = new Button({
    //         name: "Авторизоваться",
    //     });
    //     console.log("Я отрисовался: кнопка")
    // }
    render() {
        console.log("Я отрисовался: вход")
        console.log(template)
        return this.compile(template, this.props );
    }
}