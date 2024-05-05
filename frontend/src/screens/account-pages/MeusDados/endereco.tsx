import { Box, Grid, TextField, Typography, Button, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import MaskInputField from '../../../components/MaskField'
import MaskField from '../../../components/MaskField'
import { Link } from 'react-router-dom';

interface props {
   endereco: any,
   telefone: string
}

export default function EnderecoContato({ endereco, telefone, ...props }: props) {
   return (
      <Paper
         variant="elevation"
         sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 3 } }}
      >
         <Box mt={2} sx={{ display: 'flex', flexDirection: 'row' }} >
            <Typography variant="h6" gutterBottom marginRight={1}>
               Endereço e Contato
            </Typography>
         </Box>
         <Grid container spacing={3} my={1}>
            <Grid item xs={12} sm={4}>
               <TextField
                  sx={{ width: '100%' }}
                  type="text"
                  label={'Estado'}
                  value={endereco.estado}
                  InputProps={{
                     readOnly: true
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField
                  sx={{ width: '100%' }}
                  type="text"
                  label={'Munícipio'}
                  value={endereco.municipio}
                  InputProps={{
                     readOnly: true
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField
                  sx={{ width: '100%' }}
                  type="text"
                  label={'Bairro'}
                  value={endereco.bairro}
                  InputProps={{
                     readOnly: true
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <MaskField
                  name={'cep'}
                  label={'CEP'}
                  value={endereco.cep}
                  mask="00000-000"
                  definitions={{
                     '#': /[1-9]/,
                  }}
                  readOnly={true}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField
                  sx={{ width: '100%' }}
                  type="text"
                  label={'Rua'}
                  value={endereco.rua}
                  InputProps={{
                     readOnly: true
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField
                  sx={{ width: '100%' }}
                  type="text"
                  label={'Número'}
                  value={endereco.numero}
                  InputProps={{
                     readOnly: true
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={8}>
               <TextField
                  sx={{ width: '100%' }}
                  type="text"
                  label={'Complemento'}
                  value={endereco.complemento}
                  InputProps={{
                     readOnly: true
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <MaskField
                  type="text"
                  name={'telefone'}
                  label={'Telefone'}
                  mask="(00) 00000-0000"
                  value={telefone}
                  sx={{ width: '100%' }}
                  definitions={{
                     '#': /[1-9]/,
                  }}
                  readOnly={true}
               />
            </Grid>
         </Grid>
         <Box sx={{ marginBlock: '2em' }}>
            <Button variant="contained" component={Link} to='/conta/alterar-endereco'>
               Alterar Endereco e Contato
            </Button>
         </Box>
      </Paper>
   )
}
