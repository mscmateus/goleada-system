import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CircularProgress, Container, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DateField from '../../../components/DateField';
import LoadingPage from '../../../components/LoadingPage';
import MaskField from '../../../components/MaskField';
import UsuarioService from '../../../services/account.service';
import EnderecoContato from './endereco';
import User from '../../../models/entity/user';

export default function MeusDados(props: any) {
   const navigate = useNavigate();
   const [usuario, setUsuario] = useState({} as User);
   const [inLoading, setInLoading] = useState(true);
   useEffect(() => {
      UsuarioService.getUsuarioAutenticado()
         .then((usuario) => {
            setUsuario(usuario)
            setInLoading(false)
         })
   }, [])
   return (
      inLoading ? (
         <LoadingPage />
      ) : (
         <Container sx={{ mt: 4, mb: 4 }}>
            <Paper
               variant="elevation"
               sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 3 } }}
            >
               <Typography variant="h6" gutterBottom>
                  Dados Pessoais
               </Typography>
               <Grid container spacing={3} my={1}>
                  {/* <Grid item xs={12} sm={6}>
                     <TextField
                        sx={{ width: '100%' }}
                        type="text"
                        label={'Nome Completo'}
                        value={usuario.nome + ' ' + usuario.sobrenome}
                        InputProps={{
                           readOnly: true
                        }}
                     />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                     <MaskField
                        type="text"
                        name={'cpf'}
                        label={'CPF'}
                        mask="000.000.000-00"
                        value={'02345868260'}
                        sx={{ width: '100%' }}
                        readOnly={true}
                     />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                     <DateField
                        name={'dataNascimento'}
                        label={'Data de Nascimento'}
                        value={usuario.dataNascimento}
                        error={false}
                        sx={{ width: '100%' }}
                        readOnly={true}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        sx={{ width: '100%' }}
                        type="text"
                        label={'Nome da Mãe'}
                        value={usuario.nomeMae}
                        InputProps={{
                           readOnly: true
                        }}
                     />
                  </Grid> */}
               </Grid>
            </Paper>
            <Paper
               variant="elevation"
               sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 3 } }}
            >
               <Typography variant="h6" gutterBottom marginRight={1}>
                  Email
               </Typography>
               <Grid container spacing={3} my={1}>
                  <Grid item xs={12}>
                     <TextField
                        sx={{ width: '100%' }}
                        type="text"
                        label={'Email'}
                        value={usuario.email}
                        InputProps={{
                           readOnly: true
                        }}
                     />
                  </Grid>

               </Grid>
               <Box sx={{ marginBlock: '2em' }}>
                  <Button variant="contained" component={Link} to='/conta/alterar-email'>
                     Alterar E-mail
                  </Button>
               </Box>
            </Paper>
            {/* <EnderecoContato endereco={usuario.endereco} telefone={usuario.telefone} /> */}
         </Container >
      )
   );
}
