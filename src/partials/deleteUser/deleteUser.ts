import Block from '../../utilities/block';
import template from './deleteUser.hbs';

interface DeleteUserProps {
  events?: {
    click?: (event: any) => void
  }
}

export class DeleteUser extends Block {
    constructor(props: DeleteUserProps) {
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
