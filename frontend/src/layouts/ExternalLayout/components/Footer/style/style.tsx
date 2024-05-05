import { Box, Container, ListItemButton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const BoxFooter = styled(Box)(({ theme }) => ({
  borderTop: "20px solid #FECC2D",
  width: "100%",
}));

export const BoxRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const LinksRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBlock: "30px",
}));

export const LinksItem = styled(ListItemButton)(({ theme }) => ({
  padding: 0,
  borderRadius: "100%",
  background: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#30A168",
  width: "40px",
  height: "40px",
}));

export const BoxRedesSociais = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
}));

export const LinkFooter = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#7B7B7B",
  "&:hover": {
    color: "#30A168",
  },
}));