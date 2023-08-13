import Block from "../../utilities/block";
import template from "./messageFrom.hbs";

interface MessageFromProps {
    text?: string,
    time?: string,
}

export class MessageFrom extends Block {
    constructor(props: MessageFromProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
