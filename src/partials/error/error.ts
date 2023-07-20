import template from "./error.hbs";
import Block from "../../utilitis/block";

interface ErrorProps {
    ErrorNumber?: string;
    ErrorName?: string;
}

export class Error extends Block {
    constructor(props: ErrorProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, this.props );
    }
}