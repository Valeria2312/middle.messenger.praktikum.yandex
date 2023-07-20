import Block from "../../utilitis/block";
import template from "./input.hbs";

interface InputProps {
    name?: string;
    type?: string;
    value?: string;
    events?: {
        blur?: void
    }
}

export class Input extends Block {
    constructor(props: InputProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}