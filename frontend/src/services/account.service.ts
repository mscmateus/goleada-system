import { EmailChangeDto } from "../models/dto/emailChageDto";
import { PasswordChangeDto } from "../models/dto/passwordChangeDto";
import User from "../models/entity/user";
import api from '../services/interceptor'

const getUsuarioAutenticado = (): Promise<User> =>
  new Promise<User>((resolve, reject) => {
    api.get("/account/user").then((res) => {
      resolve(res.data as User)
    })
      .catch((e) => reject(e.response.data));
  });

const getPermissoesUsuario = (): Promise<Array<string>> =>
  new Promise<Array<string>>((resolve, reject) => {
    api.get("/account/permissions").then((res) => {
      resolve(res.data as Array<string>)
    })
      .catch((e) => reject(e.response.data));
  });

const sendEmailChangeCode = (email: string) =>
  new Promise((resolve, reject) => {
    api
      .post(`/account/change-email/request?email=${email}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.response.data)
      });
  });

const emailChange = (alteracaoEmail: EmailChangeDto) =>
  new Promise((resolve, reject) => {
    api
      .post(`/account/change-email`, alteracaoEmail)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.response.data)
      });
  });

const passwordChange = (alteracaoSenha: PasswordChangeDto) =>
  new Promise((resolve, reject) => {
    api
      .post(`/account/change-password`, alteracaoSenha)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e.response.data)
      });
  });

const accountDelete = () =>
  new Promise((resolve, reject) => {
    api
      .delete(`/account/delete`)
      .then((res) => {
        resolve(res.data as string)
      })
      .catch((e) => reject(e.response.data as string));
  });

const AccountService = {
  getUsuarioAutenticado,
  getPermissoesUsuario,
  sendEmailChangeCode,
  emailChange,
  passwordChange,
  accountDelete
};

export default AccountService;
