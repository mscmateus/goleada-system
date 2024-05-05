import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "@mui/material/Link";
import {
  BoxFooter,
  BoxRedesSociais,
  BoxRow,
  LinkFooter,
  LinksItem,
  LinksRow,
} from "./style/style";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "../../../../assets/imgs/nota-premiada-logo.svg";
import { ItemLista } from "../../../../screens/publicas/ConhecaPrograma/style/style";
import { useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ textAlign: "center" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const navigate = useNavigate();

  return (
    <BoxFooter
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container sx={{ my: 4 }}>
        <BoxRow>
          <img src={Logo} width={180} />
          <BoxRedesSociais>
            {/* insta */}
            <LinksItem
              onClick={() => navigate("https://www.instagram.com/?theme=dark")}
            >
              <InstagramIcon />
            </LinksItem>
            <LinksItem
              onClick={() => navigate("https://www.instagram.com/?theme=dark")}
            >
              <FacebookIcon />
            </LinksItem>
            <LinksItem
              onClick={() => navigate("https://www.instagram.com/?theme=dark")}
            >
              <YouTubeIcon />
            </LinksItem>
          </BoxRedesSociais>
        </BoxRow>
        <Box sx={{ mb: 5 }}>
          <LinksRow>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
          </LinksRow>
          <LinksRow>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
          </LinksRow>
          <LinksRow>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
            <LinkFooter to={""}>Lorem ipsum dolor sit amet.</LinkFooter>
          </LinksRow>
        </Box>
        <Copyright />
      </Container>
    </BoxFooter>
  );
}
