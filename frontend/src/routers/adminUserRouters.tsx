import AdminHome from "../screens/administration-pages/Home";
import UsersList from "../screens/administration-pages/UsersList";



export default [
   {
      name: "adminHome",
      path: "/administracao/home",
      children: <AdminHome />,
      permissao: "",
   },
   {
      name: "adminHome",
      path: "/administracao/usuarios",
      children: <UsersList />,
      permissao: "",
   },
]