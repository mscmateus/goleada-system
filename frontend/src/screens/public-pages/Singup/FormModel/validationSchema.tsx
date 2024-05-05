import * as yup from 'yup';
import checkoutFormModel from "./checkoutFormModel";

const {
    formField: {
        //Informações Pessoais
        cpf,
        nomeCompleto,
        apelido,
        dataNascimento,
        nomeDaMae,
        telefone,
        telefoneSecundario,
        //Endereço
        cep,
        uf,
        municipio,
        bairro,
        logradouro,
        numeroResidencia,
        complemento,
        //Email e senha
        email,
        senha,
        senhaConfirmacao,
        //Codigo de confirmação
        codigoConfirmacao,
        //entidade e autorizações
        entidadeSocialId,
        aceitoTermoLeis,
        autorizouDivulgacao,
        notificacoesPorEmail,
        negouImpedimento
    }
} = checkoutFormModel;

export default [
    yup.object({
        [nomeCompleto.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(200, 'Máximo de ${max} caracteres permitidos!')
            .required(`${nomeDaMae.requiredErrorMsg}`),
        [nomeDaMae.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(200, 'Máximo de ${max} caracteres permitidos!')
            .required(`${nomeDaMae.requiredErrorMsg}`),
        [apelido.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(50, 'Máximo de ${max} caracteres permitidos!'),
        [cpf.name]: yup.string()
            .min(14, 'Mínimo de ${min} dígitos esperados!')
            .max(14, 'Máximo de ${max} dígitos permitidos!')
            .required(`${cpf.requiredErrorMsg}`),
        [dataNascimento.name]: yup.string()
            .required(`${dataNascimento.requiredErrorMsg}`),
        [telefone.name]: yup.string()
            .min(15, 'Mínimo de ${min} dígitos esperados!')
            .max(15, 'Máximo de ${max} dígitos permitidos!')
            .required(`${telefone.requiredErrorMsg}`),
        [telefoneSecundario.name]: yup.string()
            .min(15, 'Mínimo de ${min} dígitos esperados!')
            .max(15, 'Máximo de ${max} dígitos permitidos!')
    }),
    yup.object({
        [cep.name]: yup.string()
            .min(9, 'Mínimo de ${min} dígitos esperados!')
            .max(9, 'Máximo de ${max} dígitos permitidos!')
            .required(`${cep.requiredErrorMsg}`),
        [uf.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(2, 'Máximo de ${max} caracteres permitidos!')
            .required(`${uf.requiredErrorMsg}`),
        [municipio.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(50, 'Máximo de ${max} caracteres permitidos!')
            .required(`${municipio.requiredErrorMsg}`),
        [bairro.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(50, 'Máximo de ${max} caracteres permitidos!')
            .required(`${bairro.requiredErrorMsg}`),
        [logradouro.name]: yup.string()
            .min(2, 'Mínimo de ${min} caracteres esperados!')
            .max(50, 'Máximo de ${max} caracteres permitidos!')
            .required(`${logradouro.requiredErrorMsg}`),
        [numeroResidencia.name]: yup.string()
            .min(1, 'Mínimo de ${min} caracteres esperados!')
            .max(50, 'Máximo de ${max} caracteres permitidos!')
            .required(`${numeroResidencia.requiredErrorMsg}`),
        [complemento.name]: yup.string()
            .max(100, 'Máximo de ${max} caracteres permitidos!')
    }),
    yup.object({
        [entidadeSocialId.name]: yup.string()
            .required(`${entidadeSocialId.requiredErrorMsg}`)
    }),
    yup.object({
        [email.name]: yup.string()
            .min(6, 'Mínimo de ${min} caracteres esperados!')
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .email('Email inválido!')
            .required(`${email.requiredErrorMsg}`),
        [senha.name]: yup.string()
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Sua senha deve conter no mínimo 8 caracteres sendo ao menos um maiúsculo, um minúsculo, um número e um símbolo!"
            )
            .required(`${senha.requiredErrorMsg}`),
        [senhaConfirmacao.name]: yup.string()
            .min(8, 'Mínimo de ${min} caracteres esperados!')
            .max(100, 'Máximo de ${max} caracteres permitidos!')
            .oneOf([yup.ref('senha')], 'As senhas devem ser iguais!')
            .required(`${senhaConfirmacao.requiredErrorMsg}`)
    }),
    yup.object({
        [codigoConfirmacao.name]: yup.string()
            .required(`${codigoConfirmacao.requiredErrorMsg}`)
    }),
    yup.object({
        [aceitoTermoLeis.name]: yup.bool()
            .oneOf([true], `${aceitoTermoLeis.requiredErrorMsg}`),
        [autorizouDivulgacao.name]: yup.bool()
            .oneOf([true], `${autorizouDivulgacao.requiredErrorMsg}`),
        [notificacoesPorEmail.name]: yup.bool(),
        [negouImpedimento.name]: yup.bool()
            .oneOf([true], `${negouImpedimento.requiredErrorMsg}`)
    })
];