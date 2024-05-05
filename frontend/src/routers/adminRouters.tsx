
import CategoriaNoticiaFormulario from "../screens/administracao/CategoriaNoticia/CategoriaNoticiaFormulario";
import CategoriasNoticia from "../screens/administracao/CategoriaNoticia/CategoriasNoticia";
import AdminHome from "../screens/administracao/Home";
import MunicipioFormulario from "../screens/administracao/Municipio/MunicipioFormulario";
import Municipios from "../screens/administracao/Municipio/Municipios";
import NoticiaFormulario from "../screens/administracao/Noticia/NoticiaFormulario";
import Noticias from "../screens/administracao/Noticia/Noticias";
import Regionais from "../screens/administracao/Regional/Regionais";
import RegionalFormulario from "../screens/administracao/Regional/RegionalFormulario";
import SorteioMensalFormulario from "../screens/administracao/SorteioMensal/SorteioMensalFormulario";
import SorteiosMensais from "../screens/administracao/SorteioMensal/SorteiosMensais";
import TipoContaBancariaFormulario from "../screens/administracao/TipoContaBancaria/TipoContaBancariaFormulario";
import TiposContaBancaria from "../screens/administracao/TipoContaBancaria/TiposContaBancaria";
import TipoSituacaoResgatePremioFormulario from "../screens/administracao/TipoSituacaoResgatePremio/TipoSituacaoResgatePremioFormulario";
import TiposSituacaoResgatePremio from "../screens/administracao/TipoSituacaoResgatePremio/TiposSituacaoResgatePremio";
import TipoStatusSorteioFormulario from "../screens/administracao/TipoStatusSorteio/TipoStatusSorteioFormulario";
import TiposStatusSorteio from "../screens/administracao/TipoStatusSorteio/TiposStatusSorteio";
import Usuarios from "../screens/administracao/Usuarios";


export default [
   {
      name: "adminHome",
      path: "/administracao/home",
      children: <AdminHome />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/regionais",
      children: <Regionais />,
      permissao: "",
   },
   {
      name: "regionalFormulario",
      path: "/administracao/regional/cadastro",
      children: <RegionalFormulario />,
      permissao: "",
   },
   {
      name: "regionalFormulario",
      path: "/administracao/regional/:id/edicao",
      children: <RegionalFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/municipios",
      children: <Municipios />,
      permissao: "",
   },
   {
      name: "municipioFormulario",
      path: "/administracao/municipio/cadastro",
      children: <MunicipioFormulario />,
      permissao: "",
   },
   {
      name: "municipioFormulario",
      path: "/administracao/municipio/:id/edicao",
      children: <MunicipioFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/noticias-categoria",
      children: <CategoriasNoticia />,
      permissao: "",
   },
   {
      name: "categoriaNoticiaFormulario",
      path: "/administracao/noticia-categoria/cadastro",
      children: <CategoriaNoticiaFormulario />,
      permissao: "",
   },
   {
      name: "categoriaNoticiaFormulario",
      path: "/administracao/noticia-categoria/:id/edicao",
      children: <CategoriaNoticiaFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/noticias",
      children: <Noticias />,
      permissao: "",
   },
   {
      name: "noticiaFormulario",
      path: "/administracao/noticia/cadastro",
      children: <NoticiaFormulario />,
      permissao: "",
   },
   {
      name: "noticiaFormulario",
      path: "/administracao/noticia/:id/edicao",
      children: <NoticiaFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/tipos-conta-bancaria",
      children: <TiposContaBancaria />,
      permissao: "",
   },
   {
      name: "tipoContaBancariaFormulario",
      path: "/administracao/tipo-conta-bancaria/cadastro",
      children: <TipoContaBancariaFormulario />,
      permissao: "",
   },
   {
      name: "tipoContaBancariaFormulario",
      path: "/administracao/tipo-conta-bancaria/:id/edicao",
      children: <TipoContaBancariaFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/tipos-status-sorteio",
      children: <TiposStatusSorteio />,
      permissao: "",
   },
   {
      name: "tipoStatusSorteioFormulario",
      path: "/administracao/tipo-status-sorteio/cadastro",
      children: <TipoStatusSorteioFormulario />,
      permissao: "",
   },
   {
      name: "tipoStatusSorteioFormulario",
      path: "/administracao/tipo-status-sorteio/:id/edicao",
      children: <TipoStatusSorteioFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/tipos-situacao-resgate-premio",
      children: <TiposSituacaoResgatePremio />,
      permissao: "",
   },
   {
      name: "tipoSituacaoResgatePremioFormulario",
      path: "/administracao/tipo-situacao-resgate-premio/cadastro",
      children: <TipoSituacaoResgatePremioFormulario />,
      permissao: "",
   },
   {
      name: "tipoSituacaoResgatePremioFormulario",
      path: "/administracao/tipo-situacao-resgate-premio/:id/edicao",
      children: <TipoSituacaoResgatePremioFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/sorteios-mensais",
      children: <SorteiosMensais />,
      permissao: "",
   },
   {
      name: "sorteioMensalFormulario",
      path: "/administracao/sorteio-mensal/cadastro",
      children: <SorteioMensalFormulario />,
      permissao: "",
   },
   {
      name: "sorteioMensalFormulario",
      path: "/administracao/sorteio-mensal/:id/edicao",
      children: <SorteioMensalFormulario />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/usuarios",
      children: <Usuarios />,
      permissao: "",
   },
]