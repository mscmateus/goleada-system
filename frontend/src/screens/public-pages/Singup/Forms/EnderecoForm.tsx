import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";
import MaskInputField from "../../../../components/FormikFields/MaskInputField";
import SelectField from "../../../../components/FormikFields/SelectField";
import { estadosBrasileiros } from "../../../../utils/enderecoUtils";
import getCepInfo from 'cep-promise'
import { FormikContext, FormikHelpers, FormikValues, useFormikContext } from "formik";
import axios from "axios";

interface endereco {
  cep: string,
  uf: string,
  municipio: string,
  bairro: string,
  logradouro: string,
  numero: string,
  complemento: string,
}



export default function EnderecoForm(props: any) {
  const formikContext = useFormikContext();
  const {
    formField: {
      cep,
      uf,
      municipio,
      bairro,
      logradouro,
      numeroResidencia,
      complemento,
    },
  } = props;

  async function handleAlteracaoCep(cep: string) {
    try {
      const response = await axios.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
      const { localidade, logradouro, bairro, uf } = response.data;
      formikContext.setFieldValue('municipio', localidade);
      formikContext.setFieldValue('uf', uf);
      formikContext.setFieldValue('logradouro', logradouro);
      formikContext.setFieldValue('bairro', bairro);
    } catch (error) {
      console.error('Erro ao obter informações do CEP:', error);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Endereço
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MaskInputField
            onBlur={(e: any) => {
              handleAlteracaoCep(e.target.value);
            }}
            name={cep.name}
            label={cep.label}
            mask="00000-000"
            definitions={{
              '#': /[1-9]/,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={uf.name}
            label={uf.label}
            data={estadosBrasileiros}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={municipio.name}
            label={municipio.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={bairro.name}
            label={bairro.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={logradouro.name}
            label={logradouro.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={numeroResidencia.name}
            label={numeroResidencia.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={complemento.name}
            label={complemento.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}