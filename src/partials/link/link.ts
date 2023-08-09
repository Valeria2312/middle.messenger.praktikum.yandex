import Block from "../../utilities/block";
import template from "./link.hbs";

interface LinkProps {
    title?: string;
    href?: string;
    classLink?: string;
    classDiv?: string;
    events?: {
      click?: (event: any) => void;
  }
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super('div',props);
    }
    addEvents() {
        const child = this._element?.querySelector('a');
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
