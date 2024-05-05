import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  IconButton,
  Toolbar,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AuthService from "../../../../services/auth.service";
import { useNavigate, NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../../../../assets/imgs/nota-premiada-logo.svg";
import Perfil from "../../../../assets/imgs/mulher-quadrada.jpg";
import HomeIcon from "@mui/icons-material/Home";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { AppContext } from "../../../../Context/AppContext";

interface NotaAppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer: () => void;
}

export default function NotaAppBar({ open, toggleDrawer }: NotaAppBarProps) {
  const [openSettings, setOpenSettings] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { usuario } = useContext(AppContext);
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        p: 0,
        [theme.breakpoints.up("md")]: {
          width: theme.spacing(9),
        },
      }),
      ...(isMobile && {
        position: "",
      }),
    },
  }));

  const handleClick = () => {
    if (open) setOpenSettings(!openSettings);
    else {
      toggleDrawer();
      setOpenSettings(!openSettings);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const menuItems = [
    { texto: "Home", link: "/conta/home", icon: <HomeIcon /> },
    {
      texto: "Meus Bilhetes",
      link: "/conta/meus-bilhetes",
      icon: <LocalActivityIcon />,
    },
    {
      texto: "Minhas Notas",
      link: "/conta/minhas-notas",
      icon: <StickyNote2Icon />,
    },
    { texto: "Sorteios", link: "/conta/sorteios", icon: <CalendarMonthIcon /> },
    {
      texto: "Prêmios Ganhos",
      link: "/conta/premios-ganhos",
      icon: <WorkspacePremiumIcon />,
    },
    { texto: "Mensagens", link: "/conta/mensagens", icon: <MessageIcon /> },
    {
      texto: "Configurações",
      link: "/conta/configuracoes",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isMobile ? open : true}
      sx={{ p: 0 }}
      PaperProps={{ sx: { backgroundColor: "#fff0", border: "none" } }}
    >
      {isMobile ? <Toolbar /> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          background: "#224B89",
          height: isMobile ? "100%" : "95vh",
          borderRadius: isMobile ? 0 : "15px",
          py: isMobile ? 0 : 2,
        }}
      >
        {/* menu sanduíche */}
        {/* Perfil */}
        <IconButton
          sx={{
            p: 0,
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            borderRadius: 0,
          }}
        >
          <Avatar
            src={Perfil}
            sx={{
              width: 85,
              height: 85,
              border: "3px solid #FECC2D",
              boxShadow: "-4px 3px 7px 2px #0000004a;",
            }}
          />
          <div>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 24,
                color: "#FECC2D",
                mb: 1,
              }}
            >
              {usuario.apelido[0].toUpperCase() + usuario.apelido.substring(1)}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#fff" }}>
              Ver Perfil
            </Typography>
          </div>
        </IconButton>
        {/* Opções */}
        <List sx={{ pl: 2 }}>
          {menuItems.map((elemento, index) => {
            const isActive = window.location.pathname === elemento.link;

            const linkStyle = {
              textDecoration: "none",
              color: isActive ? "#FECC2D" : "#fff",
            };

            const iconStyle = {
              color: isActive ? "#FECC2D" : "#fff",
              justifyContent: "center",
            };

            return (
              <NavLink to={elemento.link} style={linkStyle}>
                <ListItem key={elemento.texto} disablePadding>
                  <ListItemButton
                    sx={{ px: 0 }}
                    onClick={() => navigate(elemento.link)}
                  >
                    <ListItemIcon sx={iconStyle}>{elemento.icon}</ListItemIcon>
                    <ListItemText primary={elemento.texto} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            );
          })}
          {/* Deletar Conta */}
          <ListItem disablePadding>
            <ListItemButton sx={{ px: 0 }}>
              <ListItemIcon sx={{ color: "#fff", justifyContent: "center" }}>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Deletar Conta" />
            </ListItemButton>
          </ListItem>
          {/* Sair */}
          <ListItem disablePadding key={"Sair"} onClick={handleLogout}>
            <ListItemButton sx={{ px: 0 }}>
              <ListItemIcon sx={{ color: "#fff", justifyContent: "center" }}>
                <LogoutIcon sx={{ ml: "7px" }} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            mr: 2,
            flexGrow: 1,
            visibility: isMobile ? "hidden" : "visible",
          }}
        >
          <img src={Logo} height={"40em"} />
        </Typography>
      </Box>
      {/* Chat */}
    </Drawer>
  );
}
