import template from './chatModal.hbs';
import Block from '../../utilities/block';
import { Button } from '../button/button';
import { Form } from '../form/form';
import { InputContainer } from '../InputContainer/inputContainer';
import { validationCheck } from '../../utilities/validation';
import close from './image/free-icon-close-cross-in-circular-outlined-interface-button-58253.png';
import { Close } from '../Close/Close';

interface ChatModalProps {
  name?: string
  title?: string
  placeholder?: string
  type?: string
  nameBtn?: string
  value?: any
  events?: {
    submit?: (event: Event) => void
  }
}

// export class chatModal extends Block {
//     constructor(props: ChatModalProps) {
//         super("div", props);
//     }
//     init() {
//         this.children.close = new Close({
//             src: close,
//             alt: "close",
//             class: "close",
//             events: {
//                 click: () => {
//                     this.hide();
//                 }
//             }
//         });
//         this.children.form = new Form({
//             formClass: 'form-login',
//             children: [
//                 new InputContainer({
//                     class: 'form-input',
//                     name:this.props.name,
//                     type: this.props.type,
//                     placeholder: this.props.placeholder,
//                     value: this.props.value || '',
//                     events: {
//                         blur: (e: FocusEvent) => {
//                             validationCheck(e);
//                         }
//                     },
//                 }),
//                 new Button({
//                     name: this.props.nameBtn,
//                 }),
//             ]
//         });
//     }
//
//     render() { return this.compile(template, this.props);
//     }
// }

export class chatModal extends Block {
    constructor(props: ChatModalProps) {
        super("div", props);
    }
    init() {
        this.children.close = new Close({
            src: close,
            alt: "close",
            class: "close",
            events: {
                click: () => {
                    this.hide();
                }
            }
        });
        this.children.form = new Form({
            formClass: 'form-login',
            children: [
                new InputContainer({
                    class: 'form-input',
                    name:this.props.name,
                    type: this.props.type,
                    placeholder: this.props.placeholder,
                    value: this.props.value || '',
                    events: {
                        blur: (e: FocusEvent) => {
                            validationCheck(e);
                        }
                    },
                }),
                new Button({
                    name: this.props.nameBtn,
                    events: {
                        click: this.props.events.click
                    }
                }),
            ]
        });
    }
    render() { return this.compile(template, this.props);
    }
}

