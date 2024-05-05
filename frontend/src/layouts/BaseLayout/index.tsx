import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, Theme } from '@mui/material/styles';
import { DarkTheme } from "../../themes/dark";
import { LightTheme } from "../../themes/light";
import { Box, CssBaseline } from "@mui/material";
import { ThemeContext } from '../../Context/themeContext';
import { LoadingContext } from '../../Context/LoadingContext';

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <Box
      component={'div'}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "393px"
      }}
    >
      <CssBaseline />
      {children}
    </Box>
  );
}
