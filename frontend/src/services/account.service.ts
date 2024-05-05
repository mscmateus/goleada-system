import { AlteracaoEmailDto } from "../models/DTOs/alteracaoEmailDto";
import { AlteracaoSenhaDto } from "../models/DTOs/alteracaoSenhaDto";
import { ResumoContaDto } from "../models/DTOs/resumoContaDto";
import Pageable from "../models/pageable";
import { Bilhete } from "../models/entidades/bilhete";
import { Usuario } from "../models/entidades/usuario";
import api from "./interceptor";
import { NotaFiscal } from "../models/entidades/notaFiscal";
import { ParticipacaoSorteioListItem } from "../models/lista/participacaoSorteio";
import PremioResgate from "../models/entidades/premioResgate";

const getUsuarioAutenticado = (): Promise<Usuario> =>
  new Promise<Usuario>((resolve, reject) => {
    api.get("/conta/usuario").then((res) => {
      resolve(res.data as Usuario)
    })
      .catch((e) => reject(e.response.data));
  });

const getPermissoesUsuario = (): Promise<Array<string>> =>
  new Promise<Array<string>>((resolve, reject) => {
    api.get("/conta/permissoes").then((res) => {
      resolve(res.data as Array<string>)
    })
      .catch((e) => reject(e.response.data));
  });

const enviaCodigoAlteracaoEmail = (email: string) =>
  new Promise((resolve, reject) => {
    api
      .post(`/conta/alteracao-email/solicitacao?email=${email}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.response.data)
      });
  });

const alteraEmail = (alteracaoEmail: AlteracaoEmailDto) =>
  new Promise((resolve, reject) => {
    api
      .post(`/conta/alteracao-email/alteracao`, alteracaoEmail)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.response.data)
      });
  });

const alteraSenha = (alteracaoSenha: AlteracaoSenhaDto) =>
  new Promise((resolve, reject) => {
    api
      .post(`/conta/alteracao-senha`, alteracaoSenha)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.response.data)
      });
  });

const excluiConta = () =>
  new Promise((resolve, reject) => {
    api
      .delete(`/conta/excluir`)
      .then((res) => {
        resolve(res.data as string)
      })
      .catch((e) => reject(e.response.data as string));
  });

const resumoConta = async (): Promise<ResumoContaDto> => {
  try {
    const response = await api.get<ResumoContaDto>(`/conta/resumo`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
const buscaBilhetes = async (sorteioId: string = '', sort: string = '', page: string = '', size: string = ''): Promise<Pageable<Bilhete>> => {
  try {
    const response = await api.get<Pageable<Bilhete>>(`/conta/bilhetes`,
      { params: { sorteioId, sort, page, size } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
const buscaNotasFiscais = async (docEmitente: string = '', dataMinima: string = '', dataMaxima: string = '', valorMinimo: string = '', valorMaximo: string = '', sort: string = '', page: string = '', size: string = ''): Promise<Pageable<NotaFiscal>> => {
  try {
    valorMinimo = valorMinimo.replace(',', '.')
    valorMaximo = valorMaximo.replace(',', '.')
    const response = await api.get<Pageable<NotaFiscal>>(`/conta/notas-fiscais`,
      { params: { docEmitente, dataMinima, dataMaxima, valorMinimo, valorMaximo, sort, page, size } });
    return response.data;
  } catch (error) {
    throw error;
  }
}
const buscaParticipacoes = async (): Promise<ParticipacaoSorteioListItem[]> => {
  try {
    const response = await api.get<ParticipacaoSorteioListItem[]>(`/conta/participacoes-sorteios`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
const buscaPremiosGanhos = async (sort: string = '', page: string = '', size: string = ''): Promise<Pageable<Bilhete>> => {
  try {
    const response = await api.get<Pageable<Bilhete>>(`/conta/bilhetes-ganhos`, { params: { sort, page, size } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const enviaSolicitacaoPremioResgate = async (premioResgate: PremioResgate) => {
  try {
    const response = await api.post(`/conta/solicita-resgate-premio`, premioResgate);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const ContaService = {
  getUsuarioAutenticado,
  getPermissoesUsuario,
  enviaCodigoAlteracaoEmail,
  alteraEmail,
  alteraSenha,
  excluiConta,
  resumoConta,
  buscaBilhetes,
  buscaParticipacoes,
  buscaNotasFiscais,
  buscaPremiosGanhos,
  enviaSolicitacaoPremioResgate
};

export default ContaService;
