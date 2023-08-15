import Block from "../../utilities/block";
import template from "./chatsItem.hbs";
import { Avatar } from '../avatar/avatar';

interface ChatItemProps {
    name?: string;
    content?: string;
    time?: string;
    count?: string;
    class: string
    srcImage?:string
    events?: {
      click?: (e: FocusEvent) => void
  }
}

export class ChatItem extends Block {
    constructor(props: ChatItemProps) {
        super('div',props);
    }
    init() {
        this.children.avatar = new Avatar({
            class: this.props.class,
            // name: store.getState().user?.display_name,
            srcImage:`https://ya-praktikum.tech/api/v2/resources`,
        });
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
