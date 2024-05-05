
import { CodigoConfirmacaoDto } from "../models/DTOs/codigoConfirmacaoDto";
import PessoaFisicaCadastroDto from "../models/DTOs/pessoaFisicaCadastroDto";
import { RedefinicaoSenhaDto } from "../models/DTOs/redefinicaoSenhaDto";
import SorteioListItem from "../models/lista/sorteioListItem";
import Pageable from "../models/pageable";
import api from "./interceptor";


const cadastrar = (novaPessoaFisica: PessoaFisicaCadastroDto) =>
    new Promise((resolve, reject) => {
        api
            .post("/public/nova-conta", novaPessoaFisica)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });

const enviaCodigoConfirmacaoEmail = (email: string, nome: string) =>
    new Promise((resolve, reject) => {
        api
            .post(`/public/nova-conta/enviar-confirmacao-email?email=${email}&nome=${nome}`)
            .then((res) => {
                console.log(res)
                resolve(res.data)
            })
            .catch((e) => {
                reject(e.response.data)
            });
    });

const enviaCodigoRedefinicaoSenha = (email: string) =>
    new Promise((resolve, reject) => {
        api
            .post(`/public/redefinicao-senha/solicitacao?email=${email}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });
const redefineSenha = (redefinicaoSenha: RedefinicaoSenhaDto) =>
    new Promise((resolve, reject) => {
        api
            .post(`/public/redefinicao-senha/redefinicao?`, redefinicaoSenha)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });
const validaCodigoConfirmacao = (codigoConfirmacao: CodigoConfirmacaoDto) =>
    new Promise((resolve, reject) => {
        api
            .post(`/public/validar-codigo`, codigoConfirmacao)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });
const buscaSorteios = async (titulo: string = '', regional: string = '', dataInicio: string = '', dataTermino: string = '', sort: string = '', page: string = '', size: string = ''): Promise<Pageable<SorteioListItem>> => {
    try {
        const response = await api.get<Pageable<SorteioListItem>>(`/public/sorteio/realizados`,
            { params: { titulo, regional, dataInicio, dataTermino, sort, page, size } });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const PublicService = {
    cadastrar,
    enviaCodigoConfirmacaoEmail,
    enviaCodigoRedefinicaoSenha,
    redefineSenha,
    validaCodigoConfirmacao,
    buscaSorteios
};

export default PublicService;