import checkoutFormModel from "./checkoutFormModel"

const {
    formField: {
        telefone,
        cep,
        estado,
        municipio,
        bairro,
        rua,
        numero,
        complemento
    }
} = checkoutFormModel;

export default {
    [telefone.name]: '',
    [cep.name]: '',
    [estado.name]: '',
    [municipio.name]: '',
    [bairro.name]: '',
    [rua.name]: '',
    [numero.name]: '',
    [complemento.name]: ''
}