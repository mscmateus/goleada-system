import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingContext } from "../Context/LoadingContext";
import AdminLayout from "../layouts/AdminLayout";
import ExternalLayout from "../layouts/ExternalLayout";
import UserLayout from "../layouts/UserLayout";
import TesteDataTable from "../screens/Teste/testeDataTable";
import AlteracaoEntidade from "../screens/publicas/AlteracaoEntidade";
import CadastreSe from "../screens/publicas/CadastreSe";
import CadastroEntidade from "../screens/publicas/CadastroEntidade";
import ComoFunciona from "../screens/publicas/ComoFunciona";
import ComoReceberPremio from "../screens/publicas/ComoReceberPremio";
import ConhecaPrograma from "../screens/publicas/ConhecaPrograma";
import DadosGeraisPrograma from "../screens/publicas/DadosGeraisPrograma";
import DescadastramentoEntidade from "../screens/publicas/DescadastramentoEntidade";
import DocumentacaoNecessaria from "../screens/publicas/DocumentacaoNecessaria";
import EducacaoFiscal from "../screens/publicas/EducacaoFiscal";
import FaleConosco from "../screens/publicas/FaleConosco";
import GestaoPrograma from "../screens/publicas/GestaoPrograma";
import EntidadesCadastradas from "../screens/publicas/InstituicoesCadastradas";
import LandingPage from "../screens/publicas/LandingPage";
import Legislacao from "../screens/publicas/Legislacao";
import Login from "../screens/publicas/Login";
import MaterialDivulgacao from "../screens/publicas/MaterialDivulgacao";
import PaginaErro from "../screens/publicas/PaginaErro";
import PremiacaoEntidades from "../screens/publicas/PremiacaoEntidades";
import RedefinicaoSenha from "../screens/publicas/RedefinicaoSenha";
import SorteiosRealizados from "../screens/publicas/SorteiosRealizados";
import ProtectedRoute from "./ProtectedRoute";
import UnloggedRoute from "./UnloggedRoute";
import adminRouters from "./adminRouters";
import userRouters from "./userRouters";

const rotasUsuario = userRouters.map(({ name, path, children }) => (
  <Route
    key={name}
    path={path}
    element={<ProtectedRoute administracao={false} permissao={""} children={children} />}
  />
))
const rotasAdmin = adminRouters.map(({ name, path, children, permissao }) => (
  <Route
    key={name}
    path={path}
    element={<ProtectedRoute administracao={true} permissao={permissao} children={children} />}
  />
))
export default function Routers() {
  React.useEffect(() => {
    // console.log('Rotas')
  }, []);
  const [loading, setLoading] = React.useState(true);

  const toggleLoading = (status: boolean) => {
    setLoading(status);
  };

  return (
    <LoadingContext.Provider value={{ loading, toggleLoading }}>
      <BrowserRouter>
        <Routes>
          <Route element={<TesteDataTable />} path="/teste" />
          <Route path="/erro" element={
            <PaginaErro
              titulo="Acesso Negado"
              mensagem="Você não tem permissão para acessar essa página."
            />} />
          <Route path="/cadastre-se"
            element={<UnloggedRoute children={<CadastreSe />} redirect="/conta/home" />} />
          <Route path="/" element={<ExternalLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/conheca-programa" element={<ConhecaPrograma />} />
            <Route path="/educacao-fiscal" element={<EducacaoFiscal />} />
            <Route path="/legislacao" element={<Legislacao />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/sorteios-realizados" element={<SorteiosRealizados />} />
            <Route path="/premiacao-entidades" element={<PremiacaoEntidades />} />
            <Route path="/como-receber-premio" element={<ComoReceberPremio />} />
            <Route path="/gestao-programa" element={<GestaoPrograma />} />
            <Route path="/dados-gerais" element={<DadosGeraisPrograma />} />
            <Route path="/fale-conosco" element={<FaleConosco />} />
            <Route path="/material-divulgacao" element={<MaterialDivulgacao />} />
            <Route path="/entidades-cadastradas" element={<EntidadesCadastradas />} />
            <Route path="/documentacao-necessaria" element={<DocumentacaoNecessaria />} />
            <Route path="/cadastro-entidade" element={<CadastroEntidade />} />
            <Route path="/solicitar-alteracao" element={<AlteracaoEntidade />} />
            <Route path="/solicitar-descadastro" element={<DescadastramentoEntidade />} />
            <Route
              path="/login"
              element={<UnloggedRoute children={<Login />} redirect="/conta/home" />} />
            <Route path="/esqueci-senha"
              element={<UnloggedRoute children={<RedefinicaoSenha />} redirect="/conta/home" />} />
          </Route>
          <Route path="/" element={<UserLayout />}>
            {rotasUsuario}
          </Route>
          <Route path="/administracao" element={<AdminLayout />} >
            {rotasAdmin}
          </Route>
        </Routes>
      </BrowserRouter >
    </LoadingContext.Provider >
  );
}
