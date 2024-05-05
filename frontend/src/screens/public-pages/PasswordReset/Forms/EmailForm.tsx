import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";

export default function EmailForm(props: any) {

  const {
    formField: {
      email
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Solicitação de redefinição de senha
      </Typography>
      <Typography variant="body1" gutterBottom>
        Informe sua senha para redefinição:
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
      </Grid>
    </React.Fragment>
  );
}