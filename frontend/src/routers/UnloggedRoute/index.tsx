import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import tokenService from "../../services/token.service";
import UsuarioService from "../../services/account.service";
import { Usuario } from "../../models/entidades/usuario";
import { LoadingContext } from "../../Context/LoadingContext";
import LoadingPage from "../../components/LoadingPage";

interface Props {
  children: React.ReactElement;
  redirect: string;
}
const UnloggedRoute: React.FC<Props> = ({ children, redirect }) => {
  const { loading, toggleLoading } = React.useContext(LoadingContext);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = tokenService.getAuth();
    if (auth) {
      console.log('está autenticado')
      navigate('/conta/home');
    }
  }, [])
  return children;
};

export default UnloggedRoute;
