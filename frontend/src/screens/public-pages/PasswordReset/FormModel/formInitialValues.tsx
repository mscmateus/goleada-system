import checkoutFormModel from "./checkoutFormModel"

const {
    formField: {
        email,
        codigo,
        senha,
        confirmaSenha
    }
} = checkoutFormModel;

export default {
    [email.name]: '',
    [codigo.name]: '',
    [senha.name]: '',
    [confirmaSenha.name]: ''
}