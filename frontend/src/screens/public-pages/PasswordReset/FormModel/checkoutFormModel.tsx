export default {
    formId: 'checkoutForm',
    formField: {
        email: {
            name: 'email',
            label: 'Email *',
            requiredErrorMsg: 'Informe seu email de cadastro!'
        },
        codigo: {
            name: 'codigo',
            label: 'codigo *',
            requiredErrorMsg: 'Informe seu código de cadastro!'
        },
        senha: {
            name: 'senha',
            label: 'Senha *',
            requiredErrorMsg: 'Senha é obrigatório!'
        },
        confirmaSenha: {
            name: 'confirmaSenha',
            label: 'Confirme a senha *',
            requiredErrorMsg: 'Confirmação de senha é obrigatório!'
        },
    }
}