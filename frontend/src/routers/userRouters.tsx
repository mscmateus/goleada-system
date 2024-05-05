import AlterarEmail from "../screens/pessoaFisica/AlterarEmail";
import AlterarEndereco from "../screens/pessoaFisica/AlterarEndereco";
import AlterarSenha from "../screens/pessoaFisica/AlterarSenha";
import ApagarConta from "../screens/pessoaFisica/ApagarConta";
import UserHome from "../screens/pessoaFisica/Home";
import MeusBilhetes from "../screens/pessoaFisica/MeusBilhetes";
import MeusDados from "../screens/pessoaFisica/MeusDados";
import Privacidade from "../screens/pessoaFisica/Privacidade";
import Configuracoes from "../screens/pessoaFisica/Configuracoes";
import Nota from "../screens/publicas/Nota";
import MinhasNotas from "../screens/pessoaFisica/MinhasNotas";
import PremiosGanhos from "../screens/pessoaFisica/PremiosGanhos";
import Sorteios from "../screens/pessoaFisica/Sorteios";
import Mensagens from "../screens/pessoaFisica/Mensagens";
import ConversaAberta from "../screens/pessoaFisica/Mensagens/ConversaAberta";


export default [
   {
      name: "userHome",
      path: "/conta/home",
      children: <UserHome />,
      permissao: "",
      
   },
   {
      name: "userConta",
      path: "/conta/configuracoes",
      children: <Configuracoes />,
      permissao: "",
      
   },
   {
      name: "userMinhasNotas",
      path: "/minhas-notas",
      children: <Nota />,
      permissao: "1",
      
   },
   {
      name: "userMeusDados",
      path: "/conta/meus-dados",
      children: <MeusDados />,
      permissao: "2",
      
   },
   {
      name: "userAlterarEndereco",
      path: "/conta/alterar-endereco",
      children: <AlterarEndereco />,
      permissao: "",
      
   },
   {
      name: "userAlteracaoSenha",
      path: "/conta/alterar-senha",
      children: <AlterarSenha />,
      permissao: "",
      
   },
   {
      name: "userAlteracaoEmail",
      path: "/conta/alterar-email",
      children: <AlterarEmail />,
      permissao: "",
      
   },
   {
      name: "userAlteracaoEmail",
      path: "/conta/privacidade",
      children: <Privacidade />,
      permissao: "",
      
   },
   {
      name: "userApagarConta",
      path: "/conta/apagar",
      children: <ApagarConta />,
      permissao: "",
      
   },
   {
      name: "userMeusBilhetes",
      path: "/conta/meus-bilhetes",
      children: <MeusBilhetes />,
      permissao: "",
      
   },
   {
      name: "userMinhasNotas",
      path: "/conta/minhas-notas",
      children: <MinhasNotas />,
      permissao: "",
      
   },
   {
      name: "userPremiosGanhos",
      path: "/conta/premios-ganhos",
      children: <PremiosGanhos />,
      permissao: "",
      
   },
   {
      name: "userSorteios",
      path: "/conta/sorteios",
      children: <Sorteios />,
      permissao: "",
      
   },
   {
      name: "userMensagens",
      path: "/conta/mensagens",
      children: <Mensagens />,
      permissao: "",
      
   },
   {
      name: "userConversa",
      path: "/conta/mensagens/conversa",
      children: <ConversaAberta />,
      permissao: "",
      
   },
]