import template from './Close.hbs';
import Block from '../../utilities/block';
import './Close.scss';

interface ChatModalProps {
  alt?: string
  class?: string
  src?: string
  events?: {
    click?: (event: PointerEvent) => void
  }
}

export class Close extends Block {
    constructor(props: ChatModalProps) {
        super("div", props);
    }
    init() {}

    render() { return this.compile(template, this.props);
    }
}
