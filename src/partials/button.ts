import Block from "../utilitis/block";
import template from './button.hbs';

// предположим, что этог готово
interface ButtonProps {
    name?: string;
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}