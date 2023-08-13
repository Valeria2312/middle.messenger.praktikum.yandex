import Block from "../../utilities/block";
import template from "./MessageTo.hbs";
import { Button } from '../button/button';

interface MessageToProps {
    text: string,
    time: string,
}

export class MessageTo extends Block {
    constructor(props: MessageToProps) {
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
