import Block from "../../utilities/block";
import template from "./chatsItem.hbs";

interface ChatItemProps {
    name: string;
    content: string;
    time?: string;
    count?: string;
}

export class ChatItem extends Block {
    constructor(props: ChatItemProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
