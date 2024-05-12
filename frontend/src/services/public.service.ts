
import { ConfirmationCodeDto } from "../models/dto/confirmationCodeDto";
import { PasswordResetDto } from "../models/dto/passwordResetDto";
import User from "../models/entity/user";
import api from "./interceptor";


const singup = (user: User) =>
    new Promise((resolve, reject) => {
        api
            .post("/singup", user)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });

const sendConfirmationEmail = (email: string, name: string) =>
    new Promise((resolve, reject) => {
        api
            .post(`/singup/confirmation-email-request?email=${email}&nome=${name}`)
            .then((res) => {
                console.log(res)
                resolve(res.data)
            })
            .catch((e) => {
                reject(e.response.data)
            });
    });

const passwordResetRequest = (email: string) =>
    new Promise((resolve, reject) => {
        api
            .post(`/password-reset/request?email=${email}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });
const passwordReset = (redefinicaoSenha: PasswordResetDto) =>
    new Promise((resolve, reject) => {
        api
            .post(`/password-reset/reset?`, redefinicaoSenha)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });
const valideConfirmationCode = (codigoConfirmacao: ConfirmationCodeDto) =>
    new Promise((resolve, reject) => {
        api
            .post(`/code-validation`, codigoConfirmacao)
            .then((res) => {
                resolve(res.data)
            })
            .catch((e) => reject(e.response.data));
    });

const PublicService = {
    singup,
    sendConfirmationEmail,
    passwordResetRequest,
    passwordReset,
    valideConfirmationCode
};

export default PublicService;