import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupSuccess() {
   const navigator = useNavigate();
   return (
      <React.Fragment>
         <Typography variant="h5" gutterBottom>
            Cadastro Realizado
         </Typography>
         <Typography variant="subtitle1">
            Seu cadastro foi realizado com sucesso!
         </Typography>
         <Button variant='contained' onClick={() => { navigator("/login") }} >Ir para o Login</Button>
      </React.Fragment>
   );
}

export default SignupSuccess;
