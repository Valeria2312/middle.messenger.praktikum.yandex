import Block from "../../utilitis/block";
import template from "./chat.hbs";

interface ChatProps {
    children?: Block[];
}

export class Chat extends Block {
    constructor(props: ChatProps) {
        super('div',props);
    }
    render() {
        return this.compile(template, { ...this.props });
    }
}