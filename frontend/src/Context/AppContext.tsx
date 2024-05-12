import { createContext } from 'react';
import User from '../models/entity/user';

interface AppContextProps {
   usuario: User;
   toggleUsuario: (usuario: User) => void;
}

export const AppContext = createContext<AppContextProps>({
   usuario: {} as User,
   toggleUsuario: () => { }
});
