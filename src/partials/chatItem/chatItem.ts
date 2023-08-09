import Block from "../../utilities/block";
import template from "./chatsItem.hbs";

interface ChatItemProps {
    name: string;
    content: string;
    time?: string;
    count?: string;
    events?: {
      click?: (e: FocusEvent) => void
  }
}

export class ChatItem extends Block {
    constructor(props: ChatItemProps) {
        super('div',props);
    }
    addEvents() {
        const child = this._element?.querySelector('.chat-item');

        if(!child) {
            return;
        }
        const { events = {} } = this.props;

        for (const i in events)
        {
            child.addEventListener(i, events[i]);
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}
