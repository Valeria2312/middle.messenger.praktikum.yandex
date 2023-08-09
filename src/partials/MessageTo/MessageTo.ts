import Block from "../../utilities/block";
import template from "./MessageTo.hbs";
import { Button } from '../button/button';

interface messageToProps {
    text: string,
    time: string,
}

export class messageTo extends Block {
    constructor(props: messageToProps) {
        super('div',props);
    }
    init() {
        this.children.button = new Button({
            name: "Сохранить"
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
