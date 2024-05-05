import checkoutFormModel from "./checkoutFormModel"

const {
    formField: {
        nomeCompleto,
        cpf,
        apelido,
        nomeDaMae,
        dataNascimento,
        telefone,
        telefoneSecundario,

        entidadeSocialId,
        entidadeSocialNome,
        entidadeSocialDescricao,

        cep,
        uf,
        municipio,
        bairro,
        logradouro,
        numeroResidencia,
        complemento,

        email,
        senha,
        senhaConfirmacao,

        codigoConfirmacao,

        autorizouDivulgacao,
        negouImpedimento,
        aceitoTermoLeis,
        notificacoesPorEmail,
    }
} = checkoutFormModel;

export default {
    //dados pessoais
    [nomeCompleto.name]: 'Mateus da Silva Costa',
    [apelido.name]: 'Mateus',
    [cpf.name]: '02345868260',
    [dataNascimento.name]: '1998-04-21',
    [telefone.name]: '68992250296',
    [telefoneSecundario.name]: '',
    [nomeDaMae.name]: 'Maria Ronise da Silva Bezerra',
    //Endereco
    [cep.name]: '69912-290',
    [uf.name]: 'AC',
    [municipio.name]: 'Rio Branco',
    [bairro.name]: 'Floresta Sul',
    [logradouro.name]: 'Rodovia Transacreana',
    [numeroResidencia.name]: '4920',
    [complemento.name]: '',
    //entidade social
    [entidadeSocialId.name]: '',
    [entidadeSocialNome.name]: '',
    [entidadeSocialDescricao.name]: '',
    //Email e senha
    [email.name]: 'msc.mateussc@gmail.com',
    [senha.name]: 'Mateus001*',
    [senhaConfirmacao.name]: 'Mateus001*',
    //codigo
    [codigoConfirmacao.name]: '',
    //Entidade social e confirmações
    [negouImpedimento.name]: false,
    [aceitoTermoLeis.name]: false,
    [autorizouDivulgacao.name]: false,
    [notificacoesPorEmail.name]: false
} 