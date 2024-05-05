export default {
    formId: 'checkoutForm',
    formField: {
        //Dados pessoais
        nomeCompleto: {
            name: 'nomeCompleto',
            label: 'Nome Completo *',
            requiredErrorMsg: 'O nome completo é obrigatório'
        },
        apelido: {
            name: 'apelido',
            label: 'Apelido'
        },
        cpf: {
            name: 'cpf',
            label: 'CPF *',
            requiredErrorMsg: 'O CPF é obrigatório'
        },
        dataNascimento: {
            name: 'dataNascimento',
            label: 'Data de Nascimento *',
            requiredErrorMsg: 'A data de nascimento é obrigatório'
        },
        telefone: {
            name: 'telefone',
            label: 'Telefone *',
            requiredErrorMsg: 'O telefone é obrigatório'
        },
        telefoneSecundario: {
            name: 'telefoneSecundario',
            label: 'Telefone Secundário'
        },
        nomeDaMae: {
            name: 'nomeDaMae',
            label: 'Nome da Mãe *',
            requiredErrorMsg: 'O nome da mãe é obrigatório'
        },
        //Endereço
        codBanco: {
            name: 'codBanco',
            label: 'Código do Banco'
        },
        agencia: {
            name: 'agencia',
            label: 'Agência'
        },
        conta: {
            name: 'conta',
            label: 'Número da Conta',
        },
        digitoConta: {
            name: 'digitoConta',
            label: 'Digíto da Conta',
        },
        chavePix: {
            name: 'chavePix',
            label: 'Chave Pix'
        },
        //Entidade social e 
        entidadeSocialId: {
            name: 'entidadeSocialId',
            label: 'Entidade Social *',
            requiredErrorMsg: 'Selecione uma entidade social'
        },
        entidadeSocialNome: {
            name: 'entidadeSocialNome'
        },
        entidadeSocialDescricao: {
            name: 'entidadeSocialDescricao'
        },
        //Email e senha
        email: {
            name: 'email',
            label: 'E-mail *',
            requiredErrorMsg: 'O e-mail é obrigatório'
        },
        senha: {
            name: 'senha',
            label: 'senha *',
            requiredErrorMsg: 'A senha é obrigatória'
        },
        senhaConfirmacao: {
            name: 'senhaConfirmacao',
            label: 'Confirme a senha *',
            requiredErrorMsg: 'A confirmação da senha é obrigatória'
        },
        //Codigo Confirmacao

        codigoConfirmacao: {
            name: 'codigoConfirmacao',
            label: 'Código de confirmação',
            requiredErrorMsg: 'Informe o código de confirmação'
        },
        //confirmações
        negouImpedimento: {
            name: 'negouImpedimento',
            label: 'Nego os seguintes impedimentos: *',
            requiredErrorMsg: 'Negar o impedimento obrigatório'
        },
        aceitoTermoLeis: {
            name: 'aceitoTermoLeis',
            label: 'Aceito os termos das seguintes Leis:  *',
            requiredErrorMsg: 'Aceitar os termos e leis é obrigatório'
        },
        autorizouDivulgacao: {
            name: 'autorizouDivulgacao',
            label: 'Aceito a divulgação da minha imagem em caso de ganho de prêmios. *',
            requiredErrorMsg: 'Autorizar a divulgação é obrigatório'
        },
        notificacoesPorEmail: {
            name: 'notificacoesPorEmail',
            label: 'Desejo receber notificações por e-mail'
        },
        cep: {
            name: 'cep',
            label: 'CEP *',
            requiredErrorMsg: 'o CEP é obrigatório'
        },
        uf: {
            name: 'uf',
            label: 'Estado *',
            requiredErrorMsg: 'O estado é obrigatório'
        },
        municipio: {
            name: 'municipio',
            label: 'Município *',
            requiredErrorMsg: 'O município é obrigatório'
        },
        bairro: {
            name: 'bairro',
            label: 'Bairro *',
            requiredErrorMsg: 'O bairro é obrigatório'
        },
        logradouro: {
            name: 'logradouro',
            label: 'Logradouro *',
            requiredErrorMsg: 'O logradouro é obrigatório'
        },
        numeroResidencia: {
            name: 'numeroResidencia',
            label: 'Número da Residência *',
            requiredErrorMsg: 'O número é obrigatório'
        },
        complemento: {
            name: 'complemento',
            label: 'Complemento',
        },

    }
}