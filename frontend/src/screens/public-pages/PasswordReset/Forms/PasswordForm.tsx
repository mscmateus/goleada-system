import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputField from "../../../../components/FormikFields/InputField";

export default function PasswordForm(props: any) {

  const [showNovaSenha, setShowNovaSenha] = React.useState(false);
  const [showConfirmacaoNovaSenha, setShowConfirmacaoNovaSenha] = React.useState(false);

  const handleClickShowNovaSenha = () => setShowNovaSenha((show) => !show);

  const handleMouseDownNovaSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowConfirmacaoNovaSenha = () => setShowConfirmacaoNovaSenha((show) => !show);

  const handleMouseDownShowConfirmacaoNovaSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    formField: {
      email,
      senha,
      confirmaSenha
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Autenticação
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            name={senha.name}
            label={senha.label}
            type={showNovaSenha ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNovaSenha}
                    onMouseDown={handleMouseDownNovaSenha}
                    edge="end"
                  >
                    {showNovaSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            type={showConfirmacaoNovaSenha ? 'text' : 'password'}
            name={confirmaSenha.name}
            label={confirmaSenha.label}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmacaoNovaSenha}
                    onMouseDown={handleMouseDownShowConfirmacaoNovaSenha}
                    edge="end"
                  >
                    {showConfirmacaoNovaSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}