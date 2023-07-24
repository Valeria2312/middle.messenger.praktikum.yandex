import Block from "../../utilities/block";
import template from "./form.hbs";

interface FormProps {
    formClass?: string;
    children: Block[];
    events?: {
        submit?: (event: PointerEvent) => void
    }
}

export class Form extends Block {
    constructor(props: FormProps) {
        super('div',props);
    }
    init() {
        this.children.children = this.props.children;
    }
    addEvents() {
        const child = this._element?.querySelector('form');
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
