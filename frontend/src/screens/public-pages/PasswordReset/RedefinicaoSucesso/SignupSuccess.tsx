import { Button, Typography } from '@mui/material';
import React from 'react';

function RedefinicaoSucesso() {
	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				Senha Redefinida
			</Typography>
			<Typography variant="subtitle1">
				Sua senha foi redefinida com sucesso!
			</Typography>
			<Button href='/login' variant="contained">Ir para o Login</Button>
		</React.Fragment>
	);
}

export default RedefinicaoSucesso;
