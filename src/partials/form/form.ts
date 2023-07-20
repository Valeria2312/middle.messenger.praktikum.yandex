import Block from "../../utilitis/block";
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
    render() {
        return this.compile(template, { ...this.props });
    }
}