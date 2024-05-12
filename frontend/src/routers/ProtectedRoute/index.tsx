import React, { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UsuarioService from "../../services/account.service";
import { LoadingContext } from "../../Context/LoadingContext";
import LoadingPage from "../../components/LoadingPage";
import { Auth } from "../../models/entity/auth";
import { AppContext } from "../../Context/AppContext";
import ErrorPage from "../../screens/public-pages/ErrorPage";

interface Props {
  children: React.ReactElement;
  administracao: boolean;
  permissao: string;
}

function ProtectedRoute({ children, administracao, permissao }: Props) {
  const { loading, toggleLoading } = React.useContext(LoadingContext);
  const [podeAcessar, setPodeAcessar] = useState<boolean>(false);
  const [autorizacao, setAutorizacao] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toggleUsuario } = useContext(AppContext);
  const fetchData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setPodeAcessar(true);
        //há um usuario logado
        const usuarioAutenticado = await UsuarioService.getUsuarioAutenticado();
        toggleUsuario(usuarioAutenticado)
        //pegando o usuario logado
        if (usuarioAutenticado.role) {
          // console.log('é um admin')
          //se for administrador
          if (administracao) {
            // console.log("É uma rota admin");
            //verificando se é uma rota administrativa
            const hasRole = usuarioAutenticado.role.includes(permissao);
            setAutorizacao((hasRole || permissao === ""));
          } else {
            // console.log("É uma rota de usuário");
            navigate("/administracao/home");
          }
        } else {
          //se nao for administrador
          if (administracao) {
            // console.log("É uma rota de admin");
            navigate("/conta/home");
          } else {
            setAutorizacao(true);
          }
        }
      } else {
        navigate("/login");
      }
      toggleLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchData()

  }, [])
  return loading ? (
    <LoadingPage />
  ) : (
    podeAcessar ? (
      autorizacao ?
        children
        : (
          <ErrorPage
            titulo="Acesso Negado"
            mensagem="Você não tem permissão para acessar essa página."
          />
        )
    ) : (
      <ErrorPage
        titulo="Algo deu errado"
        mensagem="Não foi possivel acessar a página"
      />
    )
  );
}

export default ProtectedRoute;