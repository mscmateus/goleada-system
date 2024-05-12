import { Auth } from "../models/entity/auth";
import AuthService from "./auth.service";
import UsuarioService from "./account.service";

class TokenService {
  getLocalRefreshToken(): string {
    const auth = this.getLocalStorageAuth();
    if (auth) {
      return auth.refreshToken;
    }
    return "";
  }

  getLocalAccessToken(): string {
    const auth = this.getLocalStorageAuth();
    if (auth) {
      return auth.accessToken;
    }
    return "";
  }

  updateLocalAccessToken(token: string): void {
    let auth = this.getLocalStorageAuth();
    if (auth) {
      auth.accessToken = token;
    }
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  getAuth(): Auth | null {
    return this.getLocalStorageAuth();
  }

  // getUsuario(): Usuario {
  //   UsuarioService.getUsuarioAutenticado().then((usuario => (usuario)));
  // }

  setAuth(auth: Auth) {
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  removeAuth(): void {
    localStorage.clear();
  }

  getLocalStorageAuth(): Auth | null {
    let auth = localStorage.getItem("auth");
    if (auth != null && JSON.parse(auth)) {
      return JSON.parse(auth);
    }
    return null;
  }
}

export default new TokenService();
