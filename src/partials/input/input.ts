import Block from "../../utilities/block";
import template from "./input.hbs";

interface InputProps {
    name?: string;
    type?: string;
    value?: string;
    events?: {
        blur?: (e: any) => void
    }
}

export class Input extends Block {
    constructor(props: InputProps) {
        super('div',props);
    }
    addEvents() {
        const child = this._element?.firstChild;
        if(!child) {
            return
        }
        const { events = {} } = this.props;
        for (let i in events)
            child.addEventListener(i, events[i])
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
