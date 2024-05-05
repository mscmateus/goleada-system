import * as yup from 'yup';
import checkoutFormModel from "./checkoutFormModel";

const {
    formField: {
        email,
        codigo,
        senha,
        confirmaSenha
    }
} = checkoutFormModel;

export default [
    yup.object({
        [email.name]: yup.string()
            .min(6, 'Mínimo de ${min} caracteres esperados!')
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .email('Email inválido!')
            .required(`${email.requiredErrorMsg}`),
    }),
    yup.object({
        [codigo.name]: yup.string()
            .min(6, 'Informe um código válido!')
            .required("Informe o código!")
    }),
    yup.object({
        [senha.name]: yup.string()
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Sua senha deve conter no mínimo 8 caracteres sendo ao menos um maiúsculo, um minúsculo, um número e um símbolo!"
            )
            .required(`${senha.requiredErrorMsg}`),
        [confirmaSenha.name]: yup.string()
            .min(8, 'Mínimo de ${min} caracteres esperados!')
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .oneOf([yup.ref('senha')], 'As senhas devem ser iguais!')
            .required(`${confirmaSenha.requiredErrorMsg}`)
    }),
];