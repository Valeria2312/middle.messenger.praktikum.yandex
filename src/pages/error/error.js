import './error.scss'
import error from '../../partials/error.hbs'

export default () => {
    return `<main class='error'>
    {{> error ErrorNumber='500' ErrorName='Мы уже фиксим'}}
</main>`;
}