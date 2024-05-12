import React from "react";
import Grid from "@mui/material/Grid";

interface Props {
  titulo: string;
  mensagem: string;
}
export default function ErrorPage(props: Props) {
  return (
    <Grid container component="main" sx={{ flexGrow: "1" }}>
      <h1>{props.titulo}</h1>
      <p>{props.mensagem}</p>
    </Grid>
  );
}
