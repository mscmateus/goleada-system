import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PublicService from "../../../services/public.service";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";
import validationSchema from './FormModel/validationSchema';
import ConfirmationCodeForm from "./Forms/ConfirmationCodeForm";
import EmailForm from "./Forms/EmailForm";
import PasswordForm from "./Forms/PasswordForm";
import RedefinicaoSucesso from "./RedefinicaoSucesso/SignupSuccess";
import { ConfirmationCodeDto } from "../../../models/dto/confirmationCodeDto";
import { PasswordResetDto } from "../../../models/dto/passwordResetDto";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.
    secondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const theme = createTheme();

const steps = ["Solicitação", "Confirmação", "Redefinição"];
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

export default function PasswordReset() {

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [activeStep, setactiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values: any, actions: any) {
    const redefinicaoSenha: PasswordResetDto = { ...values, novaSenha: values.senha };
    PublicService.passwordReset(redefinicaoSenha)
      .then(() => {
        setactiveStep(activeStep + 1);
        actions.setSubmitting(false);
      })
      .catch((error: any) => {
        MySwal.fire('Algo deu errado', 'Não foi possível realizar a redefinição de senha, tente novamente', 'error')
        actions.setSubmitting(false);
      })
  }

  function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      if (activeStep === 0) {
        //enviar codigo de validação
        PublicService.passwordResetRequest(values.email)
        MySwal.fire('Código de Confirmação', 'Um código de confirmação de email foi enviado, verifique seu email', 'info')
        setactiveStep(activeStep + 1);
      } else if (activeStep === 1) {
        //valida codigo de confirmação
        let codigoConfirmacao: ConfirmationCodeDto = { ...values, eTipoCodigoConfirmacao: 'REDEFINICAO_SENHA' }
        PublicService.valideConfirmationCode(codigoConfirmacao)
          .then(() => {
            setactiveStep(activeStep + 1);
            MySwal.fire('Código válido', 'Seu código foi validado com sucesso!', 'info')
          })
          .catch(() => {
            MySwal.fire('Código inválido', 'Não foi possível validar o código, tente novamente.', 'error')
          })
      } else {
        actions.setTouched({});
        setactiveStep(activeStep + 1);
      }
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setactiveStep(activeStep - 1);
  }

  return (
    <Box component="main" sx={{ flexGrow: "1" }}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Redefinição de Senha
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <RedefinicaoSucesso />
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {_renderStepContent(activeStep)}
                    <Box sx={{ marginBlock: 2 }}>
                      {activeStep !== 0 && !isLastStep && (
                        <Button onClick={_handleBack} >
                          Voltar
                        </Button>
                      )}
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {isLastStep ? 'Finalizar' : 'Próximo'}
                      </Button>
                      {isSubmitting
                        && (
                          <CircularProgress
                            size={24}
                          />
                        )}
                    </Box>
                  </Form>
                )}
              </ Formik>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </Box>
  );
}
