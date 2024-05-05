import * as yup from 'yup';
import checkoutFormModel from "./checkoutFormModel";

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

export default yup.object({
    [telefone.name]: yup.string()
        .min(15, 'Mínimo de ${min} dígitos esperados!')
        .max(15, 'Máximo de ${max} dígitos permitidos!')
        .required(`${telefone.requiredErrorMsg}`),
    [cep.name]: yup.string()
        .min(9, 'Mínimo de ${min} dígitos esperados!')
        .max(9, 'Máximo de ${max} dígitos permitidos!')
        .required(`${cep.requiredErrorMsg}`),
    [estado.name]: yup.string()
        .min(2, 'Mínimo de ${min} caracteres esperados!')
        .max(50, 'Máximo de ${max} caracteres permitidos!')
        .required(`${estado.requiredErrorMsg}`),
    [municipio.name]: yup.string()
        .min(2, 'Mínimo de ${min} caracteres esperados!')
        .max(50, 'Máximo de ${max} caracteres permitidos!')
        .required(`${municipio.requiredErrorMsg}`),
    [bairro.name]: yup.string()
        .min(2, 'Mínimo de ${min} caracteres esperados!')
        .max(50, 'Máximo de ${max} caracteres permitidos!')
        .required(`${bairro.requiredErrorMsg}`),
    [rua.name]: yup.string()
        .min(2, 'Mínimo de ${min} caracteres esperados!')
        .max(50, 'Máximo de ${max} caracteres permitidos!')
        .required(`${rua.requiredErrorMsg}`),
    [numero.name]: yup.string()
        .min(1, 'Mínimo de ${min} caracteres esperados!')
        .max(50, 'Máximo de ${max} caracteres permitidos!')
        .required(`${numero.requiredErrorMsg}`),
    [complemento.name]: yup.string()
        .max(100, 'Máximo de ${max} caracteres permitidos!')
});