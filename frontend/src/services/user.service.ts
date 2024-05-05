
import UsuarioListItem from '../models/lista/usuarioListItem';
import Pageable from '../models/pageable';

import api from './interceptor';

const buscaUsuarios = async (busca: string = "", sort: string = "", page: string = '', size: string = '', direction: 'ASC' | 'DESC' | '' = ''): Promise<Pageable<UsuarioListItem>> => {
  sort = sort + ',' + direction
  try {
    const response = await api.get<Pageable<UsuarioListItem>>(`/usuario/`, {
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
    const response = await api.delete<Pageable<UsuarioListItem>>(`/usuario/${id}`);

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
