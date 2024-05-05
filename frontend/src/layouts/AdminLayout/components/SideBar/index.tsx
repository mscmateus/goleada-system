import { ExpandLess, ExpandMore } from "@mui/icons-material";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../../services/auth.service";

interface DrawerProps extends MuiDrawerProps {
  open?: boolean;
}

interface SideBarProps extends MuiDrawerProps {
  open?: boolean;
  toggleDrawer: () => void;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {

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
      [theme.breakpoints.up("md")]: {
        width: theme.spacing(9),
        position: "relative",
      },
    }),
  },
}));

export default function SideBar({ open, toggleDrawer }: SideBarProps) {
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openParametros, setOpenParametros] = React.useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  // Controla o dropdown de configuração
  const handleSettingsClick = () => {
    if (open) setOpenSettings(!openSettings);
    else {
      toggleDrawer();
      setOpenSettings(!openSettings);
    }
  };
  // Controla o dropdown de configuração
  const handleParametrosClick = () => {
    if (open) setOpenParametros(!openParametros);
    else {
      toggleDrawer();
      setOpenParametros(!openParametros);
    }
  };

  // controla o fechamento do menu pelo icon de fechar
  const handleDraweClick = () => {
    if (open) setOpenSettings(false);
    toggleDrawer();
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={handleDraweClick}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <List component="nav" aria-label="mailbox folders" disablePadding>
        <Divider />
        <nav aria-label="main mailbox folders">
          {[
            { texto: "Solicitações", link: "/" },
            { texto: "Entidades Sociais", link: "/" },
            { texto: "Sorteios", link: "/" },
            { texto: "Chat", link: "/" },
          ].map((elemento: any, index) => (
            <ListItem key={elemento.texto} disablePadding>
              <ListItemButton
                sx={{ px: 0 }}
                onClick={() => navigate(elemento.link)}
              >
                <ListItemIcon
                  sx={{ color: "#224B89", justifyContent: "center", mr: 2 }}
                >
                  {index == 0 ? <WorkspacePremiumIcon /> : ""}
                  {index == 1 ? <BackupTableIcon /> : ""}
                  {index == 2 ? <CalendarMonthIcon /> : ""}
                  {index == 3 ? <ChatIcon /> : ""}
                </ListItemIcon>
                <ListItemText primary={elemento.texto} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Usuários" onClick={() => { navigate('/administracao/usuarios') }} />
          </ListItemButton>
          {/* Paramêtros */}
          <ListItemButton onClick={handleParametrosClick}>
            <ListItemIcon>
              <SettingsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Parâmetros" />
            {openParametros ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openParametros} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Regionais" onClick={() => { navigate('/administracao/regionais') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Municípios" onClick={() => { navigate('/administracao/municipios') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Categorias de Notícia" onClick={() => { navigate('/administracao/noticias-categoria') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Notícias" onClick={() => { navigate('/administracao/noticias') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Tipos de Conta Bancária" onClick={() => { navigate('/administracao/tipos-conta-bancaria') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Tipos de Status de Sorteio" onClick={() => { navigate('/administracao/tipos-status-sorteio') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Tipos de Situação de Resgate de Prêmio" onClick={() => { navigate('/administracao/tipos-situacao-resgate-premio') }} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Sorteios Mensais" onClick={() => { navigate('/administracao/sorteios-mensais') }} />
              </ListItemButton>
            </List>
          </Collapse>
          {/* Configuração */}
          <ListItemButton onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Alterar Email" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <EditOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Alterar Senha" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* Deletar Conta */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DeleteIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Deletar Conta" />
            </ListItemButton>
          </ListItem>
          {/* Sair */}
          <ListItem disablePadding key={"Sair"} onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </nav>
      </List>
    </Drawer>
  );
}
