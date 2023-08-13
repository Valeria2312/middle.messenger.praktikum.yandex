import template from './avatar.hbs';
import Block from '../../utilities/block';

interface AvatarProps {
  srcImage?: string
  name?: string
  events?: {
    click?: (event: Event) => void
  }
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super("div", props);
    }
    addEvents() {
        const child = this._element?.querySelector('.profile__info-avatar');
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
