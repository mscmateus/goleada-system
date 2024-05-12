import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UsuarioService from '../../../services/account.service';
import PublicService from '../../../services/public.service';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formInitialValues from './FormModel/formInitialValues';
import validationSchema from './FormModel/validationSchema';
import ConfirmationCodeForm from './Forms/ConfirmationCodeForm';
import EmailForm from './Forms/EmailForm';
import PasswordForm from './Forms/PasswordForm';
import Success from './Success/Success';
import { ConfirmationCodeDto } from '../../../models/dto/confirmationCodeDto';
import { EmailChangeDto } from '../../../models/dto/emailChageDto';

const steps = ["Novo Email", "Confirmação", "Senha"];
const { formId, formField } = checkoutFormModel;
function _renderStepContent(step: number) {
   switch (step) {
      case 0:
         return <EmailForm formField={formField} />;
      case 1:
         return <ConfirmationCodeForm formField={formField} />;
      case 2:
         return <PasswordForm formField={formField} />;
      default:
         throw new Error("Unknown step");
   }
}

export default function EmailChange() {

   const [activeStep, setactiveStep] = React.useState(0);
   const currentValidationSchema = validationSchema[activeStep];
   const isLastStep = activeStep === steps.length - 1;
   const MySwal = withReactContent(Swal);

   async function _submitForm(values: any, actions: any) {
      console.log("Ultima etapa")
      let alteracaoEmail: EmailChangeDto = {
         code: values.codigo,
         email: values.email,
         password: values.senha
      }
      console.log(alteracaoEmail)
      UsuarioService.emailChange(alteracaoEmail)
         .then((e: any) => {
            console.log(e)
            MySwal.fire('Alteração de e-mail', e, 'success')
            setactiveStep(activeStep + 1);
            actions.setSubmitting(false);
         })
         .catch((e) => {
            console.log(e)
            MySwal.fire('Alteração de e-mail', e.message, 'error')
            actions.setSubmitting(false);
         })
   }

   function _handleSubmit(values: {
      [x: string]: string;
   }, actions: FormikHelpers<{
      [x: string]: string;
   }>) {
      if (isLastStep) {
         _submitForm(values, actions);
      } else {
         if (activeStep === 0) {
            console.log("etapa 0")
            actions.setSubmitting(true);
            UsuarioService.sendEmailChangeCode(values.email)
               .then((e: any) => {
                  console.log(e)
                  MySwal.fire('Código de Confirmação', e, 'success')
                  setactiveStep(activeStep + 1);
                  actions.setSubmitting(false);
               })
               .catch((e) => {
                  console.log(e)
                  MySwal.fire('Código de Confirmação', e.message, 'error')
                  actions.setSubmitting(false);
               })
         } else if (activeStep === 1) {
            console.log("etapa 1")
            actions.setSubmitting(true);
            let codigoConfirmacao: ConfirmationCodeDto = {
               code: parseInt(values.codigo),
               email: values.email,
               confirmationType: 'EMAIL_ALTERATION'
            }
            PublicService.valideConfirmationCode(codigoConfirmacao)
               .then((e: any) => {
                  MySwal.fire('Código de Confirmação', e, 'success')
                  setactiveStep(activeStep + 1);
                  actions.setSubmitting(false);
               })
               .catch((e) => {
                  MySwal.fire('Código de Confirmação', e.message, 'error')
                  actions.setSubmitting(false);
               })
         } else {
            actions.setTouched({});
            setactiveStep(activeStep + 1);
            actions.setSubmitting(false);
         }
      }
   }

   function _handleBack() {
      setactiveStep(activeStep - 1);
   }

   return (
      <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
         <Paper
            variant="elevation"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
         >
            <Typography variant="h4" gutterBottom>
               Alteração de Email
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               {activeStep === steps.length ? (
                  <Success />
               ) : (
                  <Formik
                     initialValues={formInitialValues}
                     validationSchema={currentValidationSchema}
                     onSubmit={_handleSubmit}
                  >
                     {({ isSubmitting }) => (
                        <Form id={formId} >
                           {_renderStepContent(activeStep)}
                           <Box sx={{ marginBlock: 2 }}>
                              {activeStep !== 0 && activeStep != 2 && (
                                 <Button onClick={_handleBack} >
                                    Voltar
                                 </Button>
                              )}
                              <LoadingButton
                                 loading={isSubmitting}
                                 type="submit"
                                 variant="contained"
                                 color="primary"
                              >
                                 {isLastStep ? 'Finalizar' : 'Próximo'}
                              </LoadingButton>
                           </Box>
                        </Form>
                     )}
                  </ Formik>
               )}
            </Box>
         </Paper>
      </Container>
   )
}
