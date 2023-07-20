import Block from "../../utilitis/block";
import template from "./inputContainer.hbs";

interface InputProps {
    class?: string;
    text?: string;
    children: Block[];
}

export class InputContainer extends Block {
    constructor(props: InputProps) {
        super('div',props);
    }
    init() {
        this.children.children = this.props.children;
    }
    render() {
        return this.compile(template, { ...this.props });
    }
}