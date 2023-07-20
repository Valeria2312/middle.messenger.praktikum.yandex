import Block from "../../utilitis/block";
import template from "./inputProfile.hbs";

interface InputProfileProps {
    title?: string;
    name?: string;
    type?: string;
    value?: string;
    readonly?: boolean,
    events?: {
        onblur?: (event: FocusEvent) => void
    }
}

export class InputProfile extends Block {
    constructor(props: InputProfileProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}