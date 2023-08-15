import Block from '../../utilities/block';
import template from './addUserInChat.hbs';

interface SubMenuItemProps {
  text?: string
  events?: {
    click?: (event: Event) => void
  }
}

export class SubMenuItem extends Block {
    constructor(props: SubMenuItemProps) {
        super("div", props);
    }
    addEvents() {
        const child = this._element?.querySelector('.submenu-item');
        // console.log(child);
        if(!child) {
            return;
        }
        const { events = {} } = this.props;
        for (const i in events)
            child.addEventListener(i, events[i]);
    }
    render() { return this.compile(template, this.props);
    }
}
