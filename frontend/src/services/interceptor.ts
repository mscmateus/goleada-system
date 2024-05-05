import axios from 'axios';
import TokenService from './token.service';
import { Console } from 'console';
import { Auth } from '../models/entidades/auth';
import { redirect } from 'react-router-dom';
import AuthService from './auth.service';
import { isUrlPublica } from './urls-publicas';
import Swal from "sweetalert2";

const instance = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'Content-Type': 'application/json',
	},
});

//interceptador de requisições
instance.interceptors.request.use(
	(config) => {
		// console.log(config)
		let requestUrl = config.url + '';
		//Verificando se a url da requisição é privada, caso seja privada um token é inserido
		if (!(requestUrl.search('/public') >= 0)) {
			//Verifica qual token deve ser inserido
			if (requestUrl.search('/refresh') >= 0) {
				//insere token de refresh
				const auth: Auth | null = TokenService.getAuth();
				if (auth)
					config.headers['Authorization'] = 'Bearer ' + auth.refreshToken;
			} else {
				const auth: Auth | null = TokenService.getAuth();
				if (auth)
					config.headers['Authorization'] = 'Bearer ' + auth.accessToken;
			}
		}
		return config;
	},
	(error) => {
		console.error("Erro na requisição", error)
		return Promise.reject(error);
	}
);
//interceptador de respostas
instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		if (err.code === "ERR_NETWORK") {
			Swal.fire({
				title: "<strong>Erro de Conexão</strong>",
				html: "<p>Ocorreu um erro de conexão, verifique se esta conectado a internet</p>",
				icon: 'error'
			}).then(() => window.location.reload())
			return err
		} else {
			const originalConfig = err.config;
			// console.log(err)
			let requestUrl = err.config.url + ''
			//verifica-se se a url de origem é privada
			if (!isUrlPublica(requestUrl)) {
				if (err.response) {
					// Access Token was expired
					if (err.response.status === 498) {
						if (!originalConfig._retry) {
							originalConfig._retry = true;
							if (requestUrl.search('/refresh') >= 0) {
								//Caso seja a requisição de refresh o token de refresh esta invalido, refazer login
								// console.log('Token de refresh inválido, removendo auth')
								Swal.fire({
									title: "<strong>Sessão expirada</strong>",
									html: "<p>Sua sessão expirou, para continuar acessando faça login novamente</p>",
									icon: 'error'
								}).then(() => {
									AuthService.logout()
								})
							} else {
								//caso seja qualquer requisição, tentar fazer o refresh
								// console.log('Token inválido, tentando refresh')
								try {
									await AuthService.authRefresh()
									return instance(originalConfig);
								} catch (error: any) {
									Swal.fire({
										title: "<strong>Sessão expirada</strong>",
										html: "<p>Sua sesisão expirou, para contnuar acessando faça login novamente</p>",
										icon: 'info'
									}).then(() => {
										AuthService.logout()
									})
									if (error.response && error.response.data) {
										return error.response.data;
									}
									return error;
								}
							}
						} else {
							Swal.fire({
								title: "<strong>Sessão expirada</strong>",
								html: "<p>Sua sessão expirou, para continuar acessando faça login novamente</p>",
								icon: 'info'
							}).then(() => {
								AuthService.logout()
							})
						}
					}
				}
			}
			return Promise.reject(err);
		}
	}
);

export default instance;
