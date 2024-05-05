import { redirect, useNavigate } from 'react-router-dom';
import { Usuario } from '../models/entidades/usuario';
import api from './interceptor';
import TokenService from './token.service';
import { RedefinicaoSenhaDto } from '../models/redefinicaoSenhaDto';

const login = (username: string, password: string) =>
  new Promise((resolve, reject) => {
    api
      .post('/login', {
        username,
        password,
      })
      .then((response) => {
        // console.log(response)
        TokenService.setAuth(response.data);
        resolve(response.data)
      })
      .catch((e) => reject(e));
  });

const logout = () => {
  TokenService.removeAuth();
  window.location.href = '/login'
};

// const register = (usuario: Usuario) => {
//   return api.post('/cadastre-se', usuario);
// };
const authRefresh = () =>
  new Promise((resolve, reject) => {
    api.put('/refresh').then((response) => {
      TokenService.setAuth(response.data);
      resolve(response)
    })
      .catch((e) => reject(e));
  });

const getCurrentUser = () => {
  return TokenService.getAuth();
};

const solicitaRedefinicaoSenha = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    api.post("/usuario/email/enviar-codigo-redefinicao?email=" + email).then((res) => resolve(res.data)).catch(reject)
  })
}
const confirmaCodigoRedefinicaoSenha = (redefinicaoSenha: RedefinicaoSenhaDto): Promise<void> => {
  return new Promise((resolve, reject) => {
    api.post("/usuario/email/redefine-senha", redefinicaoSenha).then((res) => resolve(res.data)).catch(reject)
  })
}
const redefinicaoSenha = (redefinicaoSenhaDto: RedefinicaoSenhaDto): Promise<void> => {
  return new Promise((resolve, reject) => {
    api.post("/usuario/email/confirma-codigo-redefinicao-senha", redefinicaoSenhaDto).then((res) => resolve(res.data)).catch(reject)
  })
}



const AuthService = {
  // register,
  login,
  logout,
  getCurrentUser,
  authRefresh,
  solicitaRedefinicaoSenha,
  confirmaCodigoRedefinicaoSenha,
  redefinicaoSenha
};

export default AuthService;
