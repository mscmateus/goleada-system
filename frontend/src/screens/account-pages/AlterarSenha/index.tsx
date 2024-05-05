import { Button, Container, Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import formInitialValues from './FormModel/formInitialValues'
import validationSchema from './FormModel/validationSchema'
import checkoutFormModel from './FormModel/checkoutFormModel'
import InputField from '../../../components/FormikFields/InputField'
import { LoadingButton } from '@mui/lab'
import UsuarioService from '../../../services/account.service'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const { formId, formField } = checkoutFormModel;
const {
   novaSenha,
   confirmacaoNovaSenha,
   senha
} = formField;
export default function AlterarSenha() {
   const MySwal = withReactContent(Swal);
   const [showNovaSenha, setShowNovaSenha] = React.useState(false);
   const [showConfirmacaoNovaSenha, setShowConfirmacaoNovaSenha] = React.useState(false);
   const [showSenha, setShowSenha] = React.useState(false);

   const _handleSubmit = (values: any, actions: any) => {
      actions.setSubmitting(true);
      UsuarioService.alteraSenha({
         novaSenha: values.novaSenha,
         senhaAtual: values.senha
      })
         .then((e: any) => {
            MySwal.fire('Sucesso', e, 'success')
            actions.setSubmitting(false);
         })
         .catch((e) => {
            MySwal.fire('Algo deu Errado', e.message, 'error')
            actions.setSubmitting(false);
         })
   }
   const handleClickShowNovaSenha = () => setShowNovaSenha((show) => !show);

   const handleMouseDownNovaSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };
   const handleClickShowConfirmacaoNovaSenha = () => setShowConfirmacaoNovaSenha((show) => !show);

   const handleMouseDownShowConfirmacaoNovaSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };
   const handleClickShowSenha = () => setShowSenha((show) => !show);

   const handleMouseDownShowSenha = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };
   return (
      <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
         <Paper
            variant="elevation"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
         >
            <Typography variant="h4" gutterBottom>
               Alteração de Senha
            </Typography>
            <Typography variant='body1'>Altere sua senha de acesso, será necessário confirmar com sua senha atual.</Typography>
            {/* Formulário para alterar senhas */}
            <Formik
               initialValues={formInitialValues}
               validationSchema={validationSchema}
               onSubmit={_handleSubmit}
            >
               {({ isSubmitting }) => (
                  <Form id={formId} >
                     <Grid container spacing={3} py={4}>
                        <Grid item xs={12} sm={12} md={12}>
                           <InputField
                              type={showNovaSenha ? 'text' : 'password'}
                              name={novaSenha.name}
                              label={novaSenha.label}
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
                        <Grid item xs={12} sm={12} md={12}>
                           <InputField
                              type={showConfirmacaoNovaSenha ? 'text' : 'password'}
                              name={confirmacaoNovaSenha.name}
                              label={confirmacaoNovaSenha.label}
                              fullWidth
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
                           />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                           <InputField
                              type={showSenha ? 'text' : 'password'}
                              name={senha.name}
                              label={senha.label}
                              fullWidth
                              InputProps={{
                                 endAdornment:
                                    <InputAdornment position="end">
                                       <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowSenha}
                                          onMouseDown={handleMouseDownShowSenha}
                                          edge="end"
                                       >
                                          {showSenha ? <VisibilityOff /> : <Visibility />}
                                       </IconButton>
                                    </InputAdornment>
                              }}
                           />
                        </Grid>
                     </Grid>
                     <Button
                        variant='contained'
                        color='inherit'
                        sx={{ mr: 2, mb: 2 }}
                        href='/conta/home'
                        LinkComponent={Link}
                     >
                        Cancelar
                     </Button>
                     <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mb: 2 }}
                     >
                        Confirmar
                     </LoadingButton>
                  </Form>
               )}
            </Formik>
         </Paper>
      </Container>
   )
}
