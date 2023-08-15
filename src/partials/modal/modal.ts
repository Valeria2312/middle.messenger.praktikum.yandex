import './modal.scss';
import template from './modal.hbs';
import Block from '../../utilities/block';
import { Button } from '../button/button';
import UserAPI from '../../controllers/user-api';
import { Close } from '../Close/Close';
import close
    from '../chatModal/image/free-icon-close-cross-in-circular-outlined-interface-button-58253.png';
import AuthApi from '../../controllers/auth-api';
import { Form } from '../form/form';
import { InputContainer } from '../InputContainer/inputContainer';
import { validationCheck } from '../../utilities/validation';

interface ModalProps {
  srcImage?: string
  name?: string
  title?: string
  type?: string
  placeholder?: string
  addChat?: boolean
  deleteChat?: boolean
  nameBtn?: string
  events?: {
    click?: (event: Event) => void
  }
}

export class Modal extends Block {
    constructor(props: ModalProps) {
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
        this.children.input = new InputContainer({
            classInput: 'modal_input',
            name: this.props.name,
            type: this.props.type,
            placeholder: this.props.placeholder,
        });
        this.children.btn = new Button({
            name: this.props.nameBtn,
            events: {
                click: () =>{
                    const input = document.querySelector(".modal_input");
                    const formData = new FormData();
                    if(input!.files[0]) {
                        console.log('сработало условие');
                        const data = input!.files[0];
                        console.log(data);
                        formData.append("avatar", data);
                        UserAPI.changeAvatar(formData);
                        AuthApi.getUser();
                    }
                    this.hide();
                }
            }
        });
    }

    render() { return this.compile(template, this.props);}
}
