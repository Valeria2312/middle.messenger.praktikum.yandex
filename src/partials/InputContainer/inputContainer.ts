import Block from "../../utilities/block";
import template from "./inputContainer.hbs";

interface InputProps {
    class?: string;
    text?: string;
    name?: string;
    type?: string;
    value?: string;
    events?: {
        blur?: (e: FocusEvent) => void
    }
}

export class InputContainer extends Block {
    constructor(props: InputProps) {
        super('div',props);
    }
    addEvents() {
        const child = this._element?.querySelector('.form-input')?.querySelector('input');

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
