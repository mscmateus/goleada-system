import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Button,
  GlobalStyles,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Box,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ThemeToggleSwith from "../../../../components/ThemeToggleSwith";
import Logo from "../../../../assets/imgs/nota-premiada-logo.svg";
import SideBar from "../SideBar/Index";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotaAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isHoveredPrograma, setIsHoveredPrograma] = useState(false);
  const [isHoveredSorteio, setIsHoveredSorteio] = useState(false);
  const [isHoveredInstituicao, setIsHoveredInstituicao] = useState(false);
  const [isHoveredAjuda, setIsHoveredAjuda] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {/* Chamando o drawer */}
          {isMobile ? <SideBar /> : null}

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <img src={Logo} width={180} />
          </Typography>

          <Box
            sx={{ display: isMobile ? "none" : "flex", alignItems: "center" }}
          >
            <nav style={{ display: "flex" }}>
              {/* HOME */}
              <Link
                variant="button"
                color="inherit"
                href="#"
                sx={{
                  my: 1,
                  mx: 2,
                  "&:hover": {
                    "& + .dropdownPrograma": {
                      display: "block",
                    },
                    color: "#FECC2D",
                  },
                  display: "flex",
                  alignItems: "center",
                  color: location.pathname === "/"  ? "#FECC2D" : "#fff",
                }}
                underline="none"
                onClick={() => {
                  navigate("");
                }}
              >
                Home
              </Link>

              <Box
                position={"relative"}
                // quando o mouse sai do elemento
                onMouseLeave={() => setIsHoveredPrograma(false)}
                sx={{ zIndex: "1000" }}
              >
                <Link
                  variant="button"
                  href="#"
                  color="inherit"
                  sx={{
                    my: 1,
                    mx: 2,
                    "&:hover": {
                      "& + .dropdownPrograma": {
                        display: "block",
                      },
                      color: "#FECC2D",
                    },
                    display: "flex",
                    alignItems: "center",
                    color:
                      location.pathname === "/conheca-programa" ||
                      location.pathname === "/educacao-fiscal" ||
                      location.pathname === "/legislacao"
                        ? "#FECC2D"
                        : "#fff",
                  }}
                  // quando o mouse entra no elemento
                  onMouseEnter={() => {
                    setIsHoveredPrograma(true);
                    setIsHoveredSorteio(false);
                    setIsHoveredInstituicao(false);
                    setIsHoveredAjuda(false);
                  }}
                  underline="none"
                >
                  Programa
                  <ArrowDropDownRoundedIcon sx={{ fontSize: "40px" }} />
                </Link>
                <Box
                  className="dropdownPrograma"
                  position={"absolute"}
                  sx={{
                    width: "200px",
                    top: "45px",
                    left: 0,
                    backgroundColor: "primary.main",
                    display: isHoveredPrograma ? "block" : "none",
                  }}
                >
                  {/* CONHEÇA O PROGRAMA */}
                  <ListItemButton
                    onClick={() => {
                      navigate("conheca-programa");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/conheca-programa"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Conheça o Programa"
                    />
                  </ListItemButton>
                  {/* EDUCAÇÃO FISCAL */}
                  <ListItemButton
                    onClick={() => {
                      navigate("educacao-fiscal");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                        location.pathname == "/educacao-fiscal" ? "#FECC2D" : "#fff",
                      }}
                      primary="Educação Fiscal"
                    />
                  </ListItemButton>
                  {/* LEGISLAÇÃO */}
                  <ListItemButton
                    onClick={() => {
                      navigate("legislacao");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color: location.pathname == "/legislacao" ? "#FECC2D" : "#fff",
                      }}
                      primary="Legislação"
                    />
                  </ListItemButton>
                </Box>
              </Box>

              <Box
                position={"relative"}
                // quando o mouse sai do elemento
                onMouseLeave={() => setIsHoveredSorteio(false)}
                sx={{ zIndex: "1000" }}
              >
                <Link
                  variant="button"
                  href="#"
                  sx={{
                    my: 1,
                    mx: 2,
                    "&:hover": {
                      "& + .dropdownSorteio": {
                        display: "block",
                      },
                      color: "#FECC2D",
                    },
                    display: "flex",
                    alignItems: "center",
                    color:
                      location.pathname === "/como-funciona" ||
                      location.pathname === "/sorteios-realizados" ||
                      location.pathname === "/premiacao-entidades" ||
                      location.pathname === "/como-receber-premio"
                        ? "#FECC2D"
                        : "#fff",
                  }}
                  // quando o mouse entra no elemento
                  onMouseEnter={() => {
                    setIsHoveredSorteio(true);
                    setIsHoveredPrograma(false);
                    setIsHoveredInstituicao(false);
                    setIsHoveredAjuda(false);
                  }}
                  underline="none"
                >
                  Sorteios
                  <ArrowDropDownRoundedIcon sx={{ fontSize: "40px" }} />
                </Link>
                <Box
                  className="dropdownSorteio"
                  position={"absolute"}
                  sx={{
                    width: "200px",
                    top: "45px",
                    backgroundColor: "primary.main",
                    display: isHoveredSorteio ? "block" : "none",
                  }}
                >
                  {/* COMO FUNCIONA */}
                  <ListItemButton
                    onClick={() => {
                      navigate("como-funciona");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/como-funciona" ? "#FECC2D" : "#fff",
                      }}
                      primary="Como Funciona"
                    />
                  </ListItemButton>
                  {/* SORTEIOS REALIZADOS */}
                  <ListItemButton
                    onClick={() => {
                      navigate("sorteios-realizados");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/sorteios-realizados"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Sorteios Realizados"
                    />
                  </ListItemButton>
                  {/* PREMIAÇÃO DAS ENTIDADES */}
                  <ListItemButton
                    onClick={() => {
                      navigate("premiacao-entidades");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/premiacao-entidades"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Premiação do Rateio para as Entidades"
                    />
                  </ListItemButton>
                  {/* COMO RECEBER O PRÊMIO */}
                  <ListItemButton
                    onClick={() => {
                      navigate("como-receber-premio");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/como-receber-premio"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Como Receber o Prêmio"
                    />
                  </ListItemButton>
                </Box>
              </Box>

              <Box
                position={"relative"}
                // quando o mouse sai do elemento
                onMouseLeave={() => setIsHoveredInstituicao(false)}
                sx={{ zIndex: "1000" }}
              >
                <Link
                  variant="button"
                  color="inherit"
                  href="#"
                  sx={{
                    my: 1,
                    mx: 2,
                    "&:hover": {
                      "& + .dropdownInstituicao": {
                        display: "block",
                      },
                      color: "#FECC2D",
                    },
                    display: "flex",
                    alignItems: "center",
                    color:
                      location.pathname == "/entidades-cadastradas" ||
                      location.pathname == "/documentacao-necessaria" ||
                      location.pathname == "/cadastro-entidade" ||
                      location.pathname == "/solicitar-alteração" ||
                      location.pathname == "/solicitar-descadastro"
                        ? "#FECC2D"
                        : "#fff",
                  }}
                  // quando o mouse entra no elemento
                  onMouseEnter={() => {
                    setIsHoveredInstituicao(true);
                    setIsHoveredPrograma(false);
                    setIsHoveredSorteio(false);
                    setIsHoveredAjuda(false);
                  }}
                  underline="none"
                >
                  Entidades
                  <ArrowDropDownRoundedIcon sx={{ fontSize: "40px" }} />
                </Link>
                <Box
                  className="dropdownInstituicao"
                  position={"absolute"}
                  sx={{
                    width: "200px",
                    top: "45px",
                    backgroundColor: "primary.main",
                    display: isHoveredInstituicao ? "block" : "none",
                  }}
                >
                  {/* ENTIDADES CADASTRADAS */}
                  <ListItemButton
                    onClick={() => {
                      navigate("entidades-cadastradas");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/entidades-cadastradas"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Entidades Cadastradas"
                    />
                  </ListItemButton>
                  {/* DOCUMENTAÇÃO NECESSÁRIA */}
                  <ListItemButton
                    onClick={() => {
                      navigate("documentacao-necessaria");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/documentacao-necessaria"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Documentação Necessária"
                    />
                  </ListItemButton>
                  {/* CADASTRO DE ENTIDADE */}
                  <ListItemButton
                    onClick={() => {
                      navigate("cadastro-entidade");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/cadastro-entidade"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Solicitar Cadastramento"
                    />
                  </ListItemButton>
                  {/* SOLICITAR ALTERAÇÃO */}
                  <ListItemButton
                    onClick={() => {
                      navigate("solicitar-alteracao");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/solicitar-alteracao"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Solicitar Alteração"
                    />
                  </ListItemButton>
                  {/* SOLICITAR DESCADASTRO */}
                  <ListItemButton
                    onClick={() => {
                      navigate("solicitar-descadastro");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/solicitar-descadastro"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Solicitar Descadastro"
                    />
                  </ListItemButton>
                </Box>
              </Box>

              <Box
                position={"relative"}
                // quando o mouse sai do elemento
                onMouseLeave={() => setIsHoveredAjuda(false)}
                sx={{ zIndex: "1000" }}
              >
                <Link
                  variant="button"
                  color="inherit"
                  href="#"
                  sx={{
                    my: 1,
                    mx: 2,
                    "&:hover": {
                      "& + .dropdownAjuda": {
                        display: "block",
                      },
                      color: "#FECC2D",
                    },
                    display: "flex",
                    alignItems: "center",
                    color:
                      location.pathname == "/dados-gerais" ||
                      location.pathname == "/gestao-programa" ||
                      location.pathname == "/fale-conosco" ||
                      location.pathname == "/material-divulgacao"
                        ? "#FECC2D"
                        : "#fff",
                  }}
                  // quando o mouse entra no elemento
                  onMouseEnter={() => {
                    setIsHoveredAjuda(true);
                    setIsHoveredPrograma(false);
                    setIsHoveredSorteio(false);
                    setIsHoveredInstituicao(false);
                  }}
                  underline="none"
                >
                  Ajuda
                  <ArrowDropDownRoundedIcon sx={{ fontSize: "40px" }} />
                </Link>
                <Box
                  className="dropdownAjuda"
                  position={"absolute"}
                  sx={{
                    width: "200px",
                    top: "45px",
                    backgroundColor: "primary.main",
                    display: isHoveredAjuda ? "block" : "none",
                  }}
                >
                  {/* DADOS GERAIS */}
                  <ListItemButton
                    onClick={() => {
                      navigate("dados-gerais");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/dados-gerais" ? "#FECC2D" : "#fff",
                      }}
                      primary="Dados Gerais"
                    />
                  </ListItemButton>
                  {/* GESTÃO DO PROGRAMA */}
                  <ListItemButton
                    onClick={() => {
                      navigate("gestao-programa");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/gestao-programa"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Gestão do Programa"
                    />
                  </ListItemButton>
                  {/* FALE CONOSCO */}
                  <ListItemButton
                    onClick={() => {
                      navigate("fale-conosco");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/fale-conosco" ? "#FECC2D" : "#fff",
                      }}
                      primary="Fale Conosco"
                    />
                  </ListItemButton>
                  {/* MATERIAL DE DIVULGAÇÃO */}
                  <ListItemButton
                    onClick={() => {
                      navigate("material-divulgacao");
                    }}
                  >
                    <ListItemText
                      sx={{
                        color:
                          location.pathname == "/material-divulgacao"
                            ? "#FECC2D"
                            : "#fff",
                      }}
                      primary="Material de Divulgação"
                    />
                  </ListItemButton>
                </Box>
              </Box>
            </nav>
            <Button
              href="/login"
              variant="text"
              color="inherit"
              sx={{
                my: 1,
                mx: 2,
                "&:hover": {
                  color: "#FECC2D",
                },
              }}
            >
              Entrar
            </Button>
            <Button
              href="/cadastre-se"
              variant="contained"
              color="secondary"
              sx={{ my: 1, mx: 2 }}
            >
              Cadastre-se
            </Button>
          </Box>
          <ThemeToggleSwith />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
