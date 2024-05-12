import { Typography } from '@mui/material';
import React from 'react';

export default function Success() {
   return (
      <React.Fragment>
         <Typography variant="h5" gutterBottom>
            Email Alterado
         </Typography>
         <Typography variant="subtitle1">
            Seu Email foi alterado com sucesso!
         </Typography>
      </React.Fragment>
   );
}
