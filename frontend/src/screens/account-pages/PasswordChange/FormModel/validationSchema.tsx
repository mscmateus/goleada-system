import * as yup from 'yup';
import checkoutFormModel from "./checkoutFormModel";

const {
    formField: {
        novaSenha,
        confirmacaoNovaSenha,
        senha
    }
} = checkoutFormModel;

export default
    yup.object({
        [senha.name]: yup.string()
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .required(`${senha.requiredErrorMsg}`)
        ,
        [novaSenha.name]: yup.string()
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Sua senha deve conter no mínimo 8 caracteres sendo ao menos um maiúsculo, um minúsculo, um número e um símbolo!"
            )
            .required(`${senha.requiredErrorMsg}`),
        [confirmacaoNovaSenha.name]: yup.string()
            .min(8, 'Mínimo de ${min} caracteres esperados!')
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .oneOf([yup.ref('novaSenha')], 'As senhas devem ser iguais!')
            .required(`${confirmacaoNovaSenha.requiredErrorMsg}`)
    });