import Block from '../../utilities/block';
import template from './addUserInChat.hbs';

interface subMenuItemProps {
  text?: string
  events?: {
    click?: (event: any) => void
  }
}

export class subMenuItem extends Block {
    constructor(props: subMenuItemProps) {
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
