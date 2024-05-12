import { ThemeProvider } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Routers from "./routers/routers";
import { DarkTheme } from "./themes/dark";
import { LightTheme } from "./themes/light";
import { ThemeContext, getStorageTheme, setStorageTheme } from './Context/themeContext';
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import br from 'dayjs/locale/pt-br';
import { AppContext } from "./Context/AppContext";
import User from "./models/entity/user";

function App() {
  const [theme, setTheme] = React.useState(LightTheme);
  const [usuario, setUsuario] = React.useState<User>({} as User);


  const toggleTheme = (theme: string) => {
    setTheme((theme === LightTheme.palette.mode ? DarkTheme : LightTheme));
    setStorageTheme(theme)
  };

  useEffect(() => {
    let storageTheme = getStorageTheme()
    if (storageTheme != null)
      toggleTheme(storageTheme)
  })

  const toggleUsuario = (usuario: User) => {
    setUsuario(usuario);
  };

  return (
    <AppContext.Provider value={{ usuario, toggleUsuario }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"br"} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
          <ThemeProvider theme={theme}>
            <Routers />
          </ThemeProvider>
        </LocalizationProvider>
      </ThemeContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
