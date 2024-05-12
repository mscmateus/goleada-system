import styled from '@emotion/styled';
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { DarkTheme } from '../../../themes/dark';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import UsuarioService from '../../../services/account.service';
import AuthService from '../../../services/auth.service';
import LoadingPage from '../../../components/LoadingPage';

export default function AccountDelete() {
   const MySwal = withReactContent(Swal);
   const [inLoading, setInLoading] = React.useState(false);

   const handleProsseguir = () => {
      MySwal.fire({
         title: 'Você realmente deseja excluir sua conta?',
         showConfirmButton: false,
         showCancelButton: true,
         showDenyButton: true,
         allowOutsideClick: false,
         denyButtonText: `Excluir`,
      }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isDenied) {
            setInLoading(true)
            UsuarioService.accountDelete()
               .then((e: any) => {
                  AuthService.logout()
                  setInLoading(false)
               })
               .catch((e) => {
                  Swal.fire('Erro ao Excluir', e, 'error')
                  setInLoading(false)
                  console.log(e)
               })
         }
      })
   }

   return (
      inLoading ? (
         <LoadingPage />
      ) : (
         <Container sx={{ py: 4, }} maxWidth="sm">
            <Paper
               variant='elevation'
               sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Typography variant="h3" gutterBottom color='error'>
                  Exclussão de Conta
               </Typography>
               <p>Ao prosseguir todos os seus dados armazenados pelo sistema nota premiada será permanentemente removidos, sendo nescessário um novo cadastro para acessar.</p>
               <p>Ao apagar sua conta você está automaticamente cancelando sua inscrição no programa nota premiada, sendo assim, não estará mais apto a participar dos sorteios.</p>
               <p>Deseja realmente apagar sua conta?</p>
               <Button
                  component={Link}
                  to="/conta"
                  sx={{ justifySelf: "center", fontWeight: 'bold', mr: 2, mb: 2 }} variant='contained'
                  color='inherit'>
                  cancelar
               </Button>

               <Button
                  onClick={handleProsseguir}
                  sx={{ justifySelf: "center", fontWeight: 'bold', mb: 2 }} variant='outlined'
                  color='error'
                  startIcon={<ReportProblemIcon />}>
                  Prosseguir com a Exclussão
               </Button>
            </Paper>
         </Container>
      )
   )
}
