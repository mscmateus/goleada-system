import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";

export default function PasswordForm(props: any) {

  const {
    formField: {
      senha
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Autenticação
      </Typography>
      <Typography variant="body1">Agora que o email foi válidado, confirme a alteração com sua senha atual:</Typography>
      <Grid container spacing={3} py={4}>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            type="password"
            name={senha.name}
            label={senha.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}