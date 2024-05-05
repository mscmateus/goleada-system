import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";
import MaskInputField from "../../../../components/FormikFields/MaskInputField";
import DatePickerField from "../../../../components/FormikFields/DatePickerField";

export default function InformacoesPessoaisForm(props: any) {

  const {
    formField: {
      cpf,
      nomeCompleto,
      apelido,
      dataNascimento,
      nomeDaMae,
      telefone,
      telefoneSecundario
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dados pessoais
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            name={nomeCompleto.name}
            label={nomeCompleto.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            name={apelido.name}
            label={apelido.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaskInputField
            type="text"
            name={cpf.name}
            label={cpf.label}
            mask="000.000.000-00"
            definitions={{
              '#': /[1-9]/,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name={dataNascimento.name}
            label={dataNascimento.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaskInputField
            type="text"
            name={telefone.name}
            label={telefone.label}
            mask="(00) 00000-0000"
            definitions={{
              '#': /[1-9]/,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaskInputField
            type="text"
            name={telefoneSecundario.name}
            label={telefoneSecundario.label}
            mask="(00) 00000-0000"
            definitions={{
              '#': /[1-9]/,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            name={nomeDaMae.name}
            label={nomeDaMae.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}