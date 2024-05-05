import { createContext } from 'react';
import { Theme } from '@mui/material/styles';
import { LightTheme } from '../themes/light';

interface ThemeContextProps {
   theme: Theme;
   toggleTheme: (theme: string) => void;
}

export const setStorageTheme = (theme: string) => {
   sessionStorage.setItem('theme', theme);
}

export const getStorageTheme = () => {
   return sessionStorage.getItem('theme')
}

export const ThemeContext = createContext<ThemeContextProps>({
   theme: LightTheme,
   toggleTheme: () => { },
});
