import * as yup from 'yup';
import checkoutFormModel from "./checkoutFormModel";

const {
    formField: {
        email,
        codigo,
        senha
    }
} = checkoutFormModel;

export default [
    yup.object({
        [email.name]: yup.string()
            .min(6, 'Mínimo de ${min} caracteres esperados!')
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .email('Email inválido!')
            .required(`${email.requiredErrorMsg}`)
    }),
    yup.object({
        [codigo.name]: yup.string()
            .min(6, 'Código inválido!')
            .required(`${codigo.requiredErrorMsg}`)
    }),
    yup.object({
        [senha.name]: yup.string()
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .required(`${senha.requiredErrorMsg}`)
    }),
];