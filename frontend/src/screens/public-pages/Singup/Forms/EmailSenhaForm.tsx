import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";

export default function EmailSenhaForm(props: any) {

  const {
    formField: {
      email,
      senha,
      senhaConfirmacao
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        E-mail e Senha
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputField
            type="text"
            name={email.name}
            label={email.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            type="password"
            name={senha.name}
            label={senha.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            type="password"
            name={senhaConfirmacao.name}
            label={senhaConfirmacao.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}