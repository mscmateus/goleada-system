import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContaService from "../../../../services/account.service";
import MaskInputField from "../../../../components/FormikFields/MaskInputField";
import PublicService from "../../../../services/public.service";

export default function CodigoConfirmacaoForm(props: any) {
  const MySwal = withReactContent(Swal);
  const [reenviar, setReenviar] = React.useState(true);
  const [textBtn, setTextBtn] = React.useState('Reenviar Email');
  const {
    formField: {
      email,
      codigoConfirmacao,
      nomeCompleto
    }
  } = props;

  React.useEffect(() => {
    bloqueiaReenvio()
  }, [])

  const enviaCodigo = () => {
    bloqueiaReenvio()
    PublicService.enviaCodigoConfirmacaoEmail(email.value, nomeCompleto.value)
  }

  const bloqueiaReenvio = () => {
    let time = 60
    setReenviar(true)
    let refreshIntervalId = setInterval(() => {
      time--;
      setTextBtn(`Reenviar em ${time}`)
      if (time == 0) {
        setTextBtn('Reenviar')
        setReenviar(false)
        clearInterval(refreshIntervalId)
      }
    }, 1000)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Código de Confirmação
      </Typography>
      <Typography variant="body1" gutterBottom>
        Para concluir seu cadastro será nescessário informar o código validação enviado ao seu email:
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: "center", textAlign: 'center' }}>
        <MaskInputField
          sx={{ display: 'flex', justifyContent: "center" }}
          type="text"
          name={codigoConfirmacao.name}
          mask="000000"
          definitions={{
            '#': /[1-9]/,
          }}
          style={{ textAlign: 'center', fontSize: '1.5em' }}
        />
      </Box>
      <Box sx={{ display: 'flex', marginBlock: 5, justifyContent: "center" }}>
        <Button
          onClick={enviaCodigo}
          variant="contained"
          color="primary"
          disabled={reenviar}
        >{textBtn}</Button>
      </Box>
    </React.Fragment>
  );
}