import checkoutFormModel from "./checkoutFormModel"

const {
    formField: {
        novaSenha,
        confirmacaoNovaSenha,
        senha
    }
} = checkoutFormModel;

export default {
    [novaSenha.name]: '',
    [confirmacaoNovaSenha.name]: '',
    [senha.name]: ''
}