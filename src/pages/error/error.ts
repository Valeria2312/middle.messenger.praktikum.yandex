import './error.scss';
import template from "./error.hbs";
import Block from '../../utilities/block';
import {Error} from "../../partials/error/error";

export class ErrorPage extends Block {
    constructor() {
        super();
    }
    init() {
        this.children.error500 = new Error({
            ErrorNumber: '500',
            ErrorName: 'Мы уже фиксим',
        });
        this.children.error404 = new Error({
            ErrorNumber: '400',
            ErrorName: 'Не туда попали',
        });
    }
    render() {
        return this.compile(template, this.props);
    }
}
