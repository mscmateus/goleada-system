import { createContext } from 'react';
import { Usuario } from '../models/entidades/usuario';

interface AppContextProps {
   usuario: Usuario;
   toggleUsuario: (usuario: Usuario) => void;
}

export const AppContext = createContext<AppContextProps>({
   usuario: {} as Usuario,
   toggleUsuario: () => { }
});
