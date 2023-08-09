import Block from '../../utilities/block';
import template from './deleteUser.hbs';

interface deleteUserProps {
  events?: {
    click?: (event: any) => void
  }
}

export class deleteUser extends Block {
    constructor(props: deleteUserProps) {
        super("div", props);
    }
    addEvents() {
        const child = this._element?.querySelector('.submenu-item_deleteChat');
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
