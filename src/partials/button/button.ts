import Block from "../../utilitis/block";
import template from './button.hbs';

interface ButtonProps {
    name?: string;
    type?: string;
    href?: string;
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}