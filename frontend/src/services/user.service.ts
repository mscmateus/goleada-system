

import UserListItem from '../models/listDto/userListItem';
import Pageable from '../models/pageable';
import api from './interceptor';

const buscaUsuarios = async (busca: string = "", sort: string = "", page: string = '', size: string = '', direction: 'ASC' | 'DESC' | '' = ''): Promise<Pageable<UserListItem>> => {
  sort = sort + ',' + direction
  try {
    const response = await api.get<Pageable<UserListItem>>(`/user/`, {
      params: { busca: busca, sort: sort, page: page, size: size }
    });

    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}
const deletaUsuario = async (id: number) => {
  try {
    const response = await api.delete<Pageable<UserListItem>>(`/user/${id}`);

    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}
const UsuarioService = {
  buscaUsuarios,
  deletaUsuario
};

export default UsuarioService;
