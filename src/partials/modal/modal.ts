import './modal.scss';
import template from './modal.hbs';
import Block from '../../utilities/block';
import { Button } from '../button/button';
import UserAPI from '../../controllers/user-api';
// import { Form } from '../form/form';
// import { handleFormSubmit, validationCheck } from '../../utilities/validation';
// import { InputContainer } from '../InputContainer/inputContainer';
// import ChatAPI from '../../controllers/chat-api';

interface ModalProps {
  srcImage?: string
  name?: string
  title?: string
  // input?: InputContainer,
  // btn?: Button,
  addChat?: boolean
  deleteChat?: boolean
  events?: {
    click?: (event: Event) => void
  }
}

export class Modal extends Block {
    constructor(props: ModalProps) {
        super("div", props);
    }
    init() {
        this.children.button = new Button({
            name: "Сохранить",
            events: {
                click: () => {
                    const input = document.querySelector(".modal_input");
                    console.log('сработало условие');
                    const formData = new FormData();
                    if(input) {
                        const data = input!.files[0];
                        console.log(data);
                        formData.append("avatar", data);
                        UserAPI.changeAvatar(formData);
                    }
                    this.hide();
                }
            }
        });
    }

    render() { return this.compile(template, this.props);
    }
}
