import Block from "../../utilities/block";
import template from './button.hbs';

interface ButtonProps {
    name?: string;
    type?: string;
    href?: string;
    events?: {
      click?: (event: any) => void
  }
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('div',props);
    }
    addEvents() {
        const child = this._element?.querySelector('.button');
        // console.log(child);
        if(!child) {
            return;
        }
        const { events = {} } = this.props;
        for (const i in events)
            child.addEventListener(i, events[i]);
    }

    render() {
        return this.compile(template, this.props);
    }
}


//button
