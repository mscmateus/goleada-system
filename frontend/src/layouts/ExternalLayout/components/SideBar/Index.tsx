import {
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { link } from "fs";

interface NotaAppBarProps extends MuiAppBarProps {
  open?: boolean;
  toggleDrawer: () => void;
}

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [openPrograma, setOpenPrograma] = React.useState(false);
  const [openSorteio, setOpenSorteio] = React.useState(false);
  const [openInstituicao, setOpenInstituicao] = React.useState(false);
  const [openAjuda, setOpenAjuda] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Função para alternar o estado do Drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    if (open) setOpenPrograma(!openPrograma);
  };
  const handleClickSorteio = () => {
    if (open) setOpenSorteio(!openSorteio);
  };
  const handleClickInstituicao = () => {
    if (open) setOpenInstituicao(!openInstituicao);
  };
  const handleClickAjuda = () => {
    if (open) setOpenAjuda(!openAjuda);
  };

  return (
    <Box>
      {/* menu sanduíche */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
          display: isMobile ? "flex" : "none",
          alignItems: "center",
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "primary.main",
            color: "#fff",
          },
        }}
        // variant="persistent"
        anchor="left"
        open={open}
      >
        {/* menu sanduíche */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            ml: "auto",
            mt: 2,
            mr: 2,
            mb: 3,
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Link
            variant="button"
            color="inherit"
            href="#"
            sx={{
              my: 1,
              mx: 2,
              display: "flex",
              alignItems: "center",
              color: location.pathname === "/" ? "#FECC2D" : "#fff",
            }}
            underline="none"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Link> */}
          <ListItemButton
            onClick={() => {
              navigate("/");
              setOpen(!open);
            }}
          >
            <ListItemText
              sx={{
                color: location.pathname == "/" ? "#FECC2D" : "#fff",
              }}
              primary="Home"
            />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemText
              sx={{
                color:
                  location.pathname == "/conheca-programa" ||
                  location.pathname == "/educacao-fiscal" ||
                  location.pathname == "/legislacao"
                    ? "#FECC2D"
                    : "#fff",
              }}
              primary="Programa"
            />
            {openPrograma ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openPrograma}
            timeout="auto"
            unmountOnExit
            sx={{ pl: 8, color: "#adadad" }}
          >
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("conheca-programa");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/conheca-programa"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Conheça o Programa"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("educacao-fiscal");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/educacao-fiscal"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Educação Fiscal"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("legislacao");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/legislacao"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Legislação"
                />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickSorteio}>
            <ListItemText
              sx={{
                color:
                  location.pathname == "/como-funciona" ||
                  location.pathname == "/sorteios-realizados" ||
                  location.pathname == "/premiacao-entidades" ||
                  location.pathname == "/como-receber-premio"
                    ? "#FECC2D"
                    : "#fff",
              }}
              primary="Sorteio"
            />
            {openSorteio ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openSorteio}
            timeout="auto"
            unmountOnExit
            sx={{ pl: 8, color: "#adadad" }}
          >
            <List component="div" disablePadding>
              {/* COMO FUNCIONA */}
              <ListItemButton
                sx={{ pl: 14 }}
                onClick={() => {
                  navigate("como-funciona");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/como-funciona"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Como Funciona"
                />
              </ListItemButton>
              {/* SORTEIOS REALIZADOS */}
              <ListItemButton
                sx={{ pl: 14 }}
                onClick={() => {
                  navigate("sorteios-realizados");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/sorteios-realizados"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Sorteios Realizados"
                />
              </ListItemButton>
              {/* PREMIAÇÃO ENTIDADES */}
              <ListItemButton
                sx={{ pl: 14 }}
                onClick={() => {
                  navigate("premiacao-entidades");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/premiacao-entidades"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Premiação do Rateio Para as Entidades"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 14 }}
                onClick={() => {
                  navigate("como-receber-premio");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/como-receber-premio"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Como Receber o Prêmio"
                />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickInstituicao}>
            <ListItemText
              sx={{
                color:
                  location.pathname == "/entidades-cadastradas" ||
                  location.pathname == "/documentacao-necessaria" ||
                  location.pathname == "/cadastro-entidade" ||
                  location.pathname == "/solicitar-alteracao" ||
                  location.pathname == "/solicitar-descadastro"
                    ? "#FECC2D"
                    : "#fff",
              }}
              primary="Instituição"
            />
            {openInstituicao ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openInstituicao}
            timeout="auto"
            unmountOnExit
            sx={{ pl: 8, color: "#adadad" }}
          >
            <List component="div" disablePadding>
              {/* ENTIDADES CADASTRADAS */}
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("entidades-cadastradas");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/entidades-cadastradas"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Entidades Cadastradas"
                />
              </ListItemButton>
              {/* DOCUMENTAÇÃO NECESSÁRIA */}
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("documentacao-necessaria");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/documentacao-necessaria"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Documentação necessária"
                />
              </ListItemButton>
              {/* SOLICITAÇÃO DE CADASTRO */}
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("cadastro-entidade");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/cadastro-entidade"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Solicitar Cadastramento"
                />
              </ListItemButton>
              {/* SOLICITAR ALTERAÇÃO */}
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("solicitar-alteracao");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/solicitar-alteracao"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Solicitar Alteração"
                />
              </ListItemButton>
              {/* SOLICITAR DESCADASTRO */}
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("solicitar-descadastro");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/solicitar-descadastro"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Solicitar Descadastro"
                />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickAjuda}>
            <ListItemText
              sx={{
                color:
                  location.pathname == "/dados-gerais" ||
                  location.pathname == "/gestao-programa" ||
                  location.pathname == "/fale-conosco" ||
                  location.pathname == "/material-divulgacao"
                    ? "#FECC2D"
                    : "#fff",
              }}
              primary="Ajuda"
            />
            {openAjuda ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openAjuda}
            timeout="auto"
            unmountOnExit
            sx={{ pl: 8, color: "#adadad" }}
          >
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("dados-gerais");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/dados-gerais"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Dados Gerais"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("gestao-programa");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/gestao-programa"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Gestão do Programa"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("fale-conosco");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/fale-conosco"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Fale conosco"
                />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 10 }}
                onClick={() => {
                  navigate("material-divulgacao");
                  setOpen(!open);
                }}
              >
                <ListItemText
                  sx={{
                    color:
                      location.pathname == "/material-divulgacao"
                        ? "#FECC2D"
                        : "#adadad",
                  }}
                  primary="Material de divulgação"
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemText primary="Entrar" />
          </ListItemButton>
          <ListItemButton>
            <Button
              href="/cadastre-se"
              variant="contained"
              color="secondary"
              sx={{ my: 1 }}
            >
              Cadastre-se
            </Button>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}
