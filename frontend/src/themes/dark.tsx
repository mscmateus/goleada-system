import { ptBR } from '@mui/material/locale';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { ptBR as pickersPtBR } from '@mui/x-date-pickers/locales';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#224B89',
    },
    secondary: {
      main: '#30A168',
    },
    warning: {
      main: '#FECC2D',
    },
  },
  // typography: {
  //   fontFamily: 'Hanken Grotesk',
  // },
};

export const DarkTheme = createTheme(themeOptions, 
  ptBR, // x-data-grid translations
)