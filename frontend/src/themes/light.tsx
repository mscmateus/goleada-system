import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ptBR } from '@mui/x-data-grid';
import { DataGrid, bgBG } from '@mui/x-data-grid';
import { ptBR as pickersPtBR } from '@mui/x-date-pickers/locales';
import { ptBR as corePtBR } from '@mui/material/locale';

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#224B89",
    },
    secondary: {
      main: "#30A168",
    },
    warning: {
      main: "#FECC2D",
    },
  },
  shape: {
    borderRadius: 8,
  },
  // typography: {
  //   fontFamily: "Hanken Grotesk",
  // },
};

export const LightTheme = createTheme(themeOptions,
  ptBR, // x-data-grid translations
  pickersPtBR, // x-date-pickers translations
  corePtBR, // core translations);
)
