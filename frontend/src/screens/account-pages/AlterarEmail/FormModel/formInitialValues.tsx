import checkoutFormModel from "./checkoutFormModel"

const {
    formField: {
        email,
        codigo,
        senha
    }
} = checkoutFormModel;

export default {
    [email.name]: '',
    [codigo.name]: '',
    [senha.name]: ''
}