import { LoadingButton } from '@mui/lab';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputField from '../../../components/FormikFields/InputField';
import MaskInputField from '../../../components/FormikFields/MaskInputField';
import LoadingPage from '../../../components/LoadingPage';
import PublicService from '../../../services/public.service';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formDefaultInitialValues from './FormModel/formInitialValues';
import validationSchema from './FormModel/validationSchema';

const { formId, formField } = checkoutFormModel;
const {
   telefone,
   cep,
   estado,
   municipio,
   bairro,
   rua,
   numero,
   complemento
} = formField;
export default function AlterarEndereco() {
   const MySwal = withReactContent(Swal);
   const navigation = useNavigate();
   const [inLoading, setInLoading] = useState(true);
   const [formInitialValues, setFormInitialValues] = useState<any>(formDefaultInitialValues);

   const _handleSubmit = (values: any, actions: any) => {
      actions.setSubmitting(true);
   }

   useEffect(() => {
      // UsuarioService.getUsuarioAutenticado()
      //    .then((usuario) => {
      //       setFormInitialValues({ ...usuario.endereco, telefone: usuario.telefone })
      //       setInLoading(false)
      //    })
   }, [])

   return (
      inLoading ? (
         <LoadingPage />
      ) : (
         <Container sx={{ mt: 4, mb: 4 }}>
            <Paper
               variant="elevation"
               sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
               <Typography variant="h4" gutterBottom>
                  Alteração de Endereço
               </Typography>
               <Formik
                  initialValues={formInitialValues}
                  validationSchema={validationSchema}
                  onSubmit={_handleSubmit}
               >
                  {({ isSubmitting }) => (
                     <Form id={formId} >
                        <Grid container spacing={3}>
                           <Grid item xs={12} sm={6}>
                              <MaskInputField
                                 name={telefone.name}
                                 label={telefone.label}
                                 mask="(00) 00000-0000"
                                 definitions={{
                                    '#': /[1-9]/,
                                 }}
                              />
                           </Grid>
                        </Grid>
                        <Grid container spacing={3} py={4}>
                           <Grid item xs={12} sm={6}>
                              <MaskInputField
                                 name={cep.name}
                                 label={cep.label}
                                 mask="00000-000"
                                 definitions={{
                                    '#': /[1-9]/,
                                 }}
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <InputField
                                 name={estado.name}
                                 label={estado.label}
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
                                 name={rua.name}
                                 label={rua.label}
                                 fullWidth
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <InputField
                                 name={numero.name}
                                 label={numero.label}
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
   )
}
