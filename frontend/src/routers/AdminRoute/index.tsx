import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import tokenService from "../../services/token.service";
import UsuarioService from "../../services/account.service";
import { ContentPasteOffSharp } from "@mui/icons-material";
import LoadingPage from "../../components/LoadingPage";
import AuthService from "../../services/auth.service";
import { Auth } from "../../models/entity/auth";

interface Props {
  children: React.ReactElement;
  permissao: string;
}
const AdminRoute: React.FC<Props> = (props) => {
  const [canAcess, setCanAcess] = useState<boolean | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  const _getPermissoesUsuario = async () => {
    //pega as permissoes do servidor
    let permissoesUsuario = await UsuarioService.getPermissoesUsuario();
    //verifica se o usuario tem permisão para acessar a pagina
    let hasRole = permissoesUsuario.find(
      (element) => props.permissao === element
    );
    //verifica se o usuario tem permisssão ou se não é nescessario nenhuma
    let tem: boolean = ((hasRole && hasRole != '' && hasRole != undefined) || props.permissao === '')
    setCanAcess(tem);
    setLoading(false)
  }
  useEffect(() => {
    if (AuthService.getCurrentUser() != null) {
      _getPermissoesUsuario()
      setAuth(AuthService.getCurrentUser())
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <LoadingPage />
  } else {
    if (auth != null) {
      if (canAcess === true) {
        return props.children
      } else if (canAcess === false) {
        return <Navigate to="/erro" replace />
      }
    }
    return <Navigate to="/login" replace />
  }
};

export default AdminRoute;
