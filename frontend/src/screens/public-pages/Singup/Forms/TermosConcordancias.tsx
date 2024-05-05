import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";
import CheckboxField from "../../../../components/FormikFields/CheckboxField";
import { Box } from "@mui/material";

export default function TermosConcordancias(props: any) {

  const {
    formField: {
      entidadeSocialId,
      aceitoTermoLeis,
      autorizouDivulgacao,
      notificacoesPorEmail,
      negouImpedimento
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Autenticação
      </Typography>
      <Grid container spacing={3} sx={{ mx: 2, color: (theme) => (theme.palette.primary.main), fontWeight: 'bold' }}>
        <Grid item xs={12} sm={12} >
          <CheckboxField
            fullWidth
            name={negouImpedimento.name}
            label={negouImpedimento.label}
          />
          <Box sx={{ marginLeft: 4 }}>
            <Typography variant="body1">Fazer parte da administração do estado</Typography>
            <Typography variant="body1">Fazer parte da gerência do projeto</Typography>
          </Box>
          <CheckboxField
            fullWidth
            name={aceitoTermoLeis.name}
            label={aceitoTermoLeis.label}
          />
          <Box sx={{ marginLeft: 4 }}>
            <Typography variant="body1">Lei XXXX/XXXX</Typography>
            <Typography variant="body1">Lei XXXX/XXXX</Typography>
          </Box>
          <CheckboxField
            fullWidth
            name={autorizouDivulgacao.name}
            label={autorizouDivulgacao.label}
          />
          <CheckboxField
            fullWidth
            name={notificacoesPorEmail.name}
            label={notificacoesPorEmail.label}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}