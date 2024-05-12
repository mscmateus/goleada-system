import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingContext } from "../Context/LoadingContext";
import AdminLayout from "../layouts/AdminLayout";
import ExternalLayout from "../layouts/ExternalLayout";
import UserLayout from "../layouts/UserLayout";
import TesteDataTable from "../screens/Teste/testeDataTable";
import ProtectedRoute from "./ProtectedRoute";
import UnloggedRoute from "./UnloggedRoute";
import adminRouters from "./adminUserRouters";
import userRouters from "./userRouters";
import LandingPage from "../screens/public-pages/LandingPage";
import PasswordReset from "../screens/public-pages/PasswordReset";
import Login from "../screens/public-pages/Login";
import Singup from "../screens/public-pages/Singup";
import ErrorPage from "../screens/public-pages/ErrorPage";

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
            <ErrorPage
              titulo="Acesso Negado"
              mensagem="Você não tem permissão para acessar essa página."
            />} />
          <Route path="/singup"
            element={<UnloggedRoute children={<Singup />} redirect="/conta/home" />} />
          <Route path="/" element={<ExternalLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<UnloggedRoute children={<Login />} redirect="/conta/home" />} />
            <Route path="/esqueci-senha"
              element={<UnloggedRoute children={<PasswordReset />} redirect="/conta/home" />} />
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
