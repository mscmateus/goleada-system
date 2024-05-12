import AccountDelete from "../screens/account-pages/AccountDelete";
import AccountSettings from "../screens/account-pages/AccountSettings";
import EmailChange from "../screens/account-pages/EmailChange";
import UserHome from "../screens/account-pages/Home";
import PasswordChange from "../screens/account-pages/PasswordChange";
import Privacy from "../screens/account-pages/Privacy";



export default [
   {
      name: "userHome",
      path: "/conta/home",
      children: <UserHome />,
      permissao: "",

   },
   {
      name: "userConta",
      path: "/account/settings",
      children: <AccountSettings />,
      permissao: "",

   },
   {
      name: "userAlteracaoSenha",
      path: "/account/password-change",
      children: <PasswordChange />,
      permissao: "",

   },
   {
      name: "userAlteracaoEmail",
      path: "/account/email-change",
      children: <EmailChange />,
      permissao: "",

   },
   {
      name: "userAlteracaoEmail",
      path: "/account/privacy",
      children: <Privacy />,
      permissao: "",

   },
   {
      name: "userApagarConta",
      path: "/account/delete",
      children: <AccountDelete />,
      permissao: "",

   }
]