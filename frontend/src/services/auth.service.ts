import { redirect, useNavigate } from 'react-router-dom';
import api from './interceptor';
import TokenService from './token.service';

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



const AuthService = {
  // register,
  login,
  logout,
  getCurrentUser,
  authRefresh
};

export default AuthService;
