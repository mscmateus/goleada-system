import React, { useContext, useState } from "react";
import { createTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import BaseLayout from "../BaseLayout";
import Footer from "../ExternalLayout/components/Footer";
import SideBar from "./components/SideBar";
import UserAppBar from "./components/AppBar";
import { useTheme } from "@mui/material/styles";
import { LoadingContext } from "../../Context/LoadingContext";

export default function UserLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { loading, toggleLoading } = React.useContext(LoadingContext);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return !loading ? (
    <BaseLayout>
      {isMobile ? <UserAppBar open={open} toggleDrawer={toggleDrawer} /> : null}
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
          alignItems: "center",
          paddingRight: isMobile ? 0 : "16px",
        }}
      >
        <SideBar open={open} toggleDrawer={toggleDrawer} sx={{ p: 0 }} />
        {/* Hero unit */}
        <Box sx={{ p: 0, m: 0, width: isMobile ? "96%" : "79%", height: "100vh" }}>
          <Outlet />
        </Box>
      </Container>

      {/* Footer */}
      {/* <Footer /> */}
      {/* End footer */}
    </BaseLayout>
  ) : (
    <BaseLayout>
      {isMobile ? <UserAppBar open={open} toggleDrawer={toggleDrawer} /> : null}
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            p: 0,
            m: 0,
            width: "100%",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </BaseLayout>
  );
}
