import LoadingButton from '@mui/lab/LoadingButton';
import { Button, IconButton, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PessoaFisicaCadastroDto from "../../../models/DTOs/pessoaFisicaCadastroDto";
import PublicService from "../../../services/public.service";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";
import validationSchema from './FormModel/validationSchema';
import CodigoConfirmacaoForm from "./Forms/CodigoConfirmacaoForm";
import EmailSenhaForm from "./Forms/EmailSenhaForm";
import EnderecoForm from "./Forms/EnderecoForm";
import TermosConcordancias from "./Forms/TermosConcordancias";
import InformacoesPessoaisForm from "./Forms/InformacoesPessoaisForm";
import SignupSuccess from "./SignupSuccess/SignupSuccess";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from "../../../assets/imgs/nota-premiada-logo.svg"
import EntidadeSocialForm from './Forms/EntidadeSocialForm';
import BaseLayout from '../../../layouts/BaseLayout';


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
        Nota Premiada
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Dados Pessoais", "Endereço", "Entidade Social", "E-mail e senha", "Confirmação", "Finalização"];
const { formId, formField } = checkoutFormModel;


export default function CadastreSe() {

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [activeStep, setactiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <InformacoesPessoaisForm formField={formField} />;
      case 1:
        return <EnderecoForm formField={formField} />;
      case 2:
        return <EntidadeSocialForm formField={formField} />;
      case 3:
        return <EmailSenhaForm formField={formField} />;
      case 4:
        return <CodigoConfirmacaoForm formField={formField} />;
      case 5:
        return <TermosConcordancias formField={formField} />;
      default:
        throw new Error("Etapa desconhecida");
    }
  }

  async function _submitForm(values: PessoaFisicaCadastroDto, actions: any) {
    values.cpf = values.cpf.replace(/[^\d]+/g, '')
    values.cep = values.cep.replace(/[^\d]+/g, '')
    values.telefone = values.telefone.replace(/[^\d]+/g, '')
    values.telefoneSecundario = values.telefoneSecundario?.replace(/[^\d]+/g, '')

    const novaPessoaFisica: PessoaFisicaCadastroDto = { ...values } as PessoaFisicaCadastroDto;
    PublicService.cadastrar(novaPessoaFisica)
      .then(() => {
        setactiveStep(activeStep + 1);
        actions.setSubmitting(false);
      })
      .catch((error: any) => {
        console.log(error)
        var errorMessages = error.join('\n');
        MySwal.fire('Algo deu errado', errorMessages, 'error')
        actions.setSubmitting(false);
      })
  }


  function _handleSubmit(values: any, actions: any) {
    console.log(activeStep)
    if (isLastStep) {
      console.log(values)
      _submitForm(values, actions);
    } else {
      if (activeStep === 3) {
        actions.setSubmitting(true);
        PublicService.enviaCodigoConfirmacaoEmail(values.email, values.nomeCompleto)
          .then((e: any) => {
            MySwal.fire('Confirmação de E-mail', e, 'success')
            setactiveStep(activeStep + 1);
            actions.setSubmitting(false);
          })
          .catch((e: any) => {
            console.log(e)
            MySwal.fire('Confirmação de E-mail', e.message, 'error')
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
    <BaseLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "393px"
        }}
      >
        <Box component="main" sx={{ flexGrow: "1", background: (theme) => (theme.palette.primary.main) }}>
          <Container component="main" maxWidth="md" sx={{ mb: 4, my: { xs: 3, md: 3 } }} >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <IconButton aria-label="back" sx={{ color: '#FFF' }} >
                <ArrowBackIcon />Voltar
              </IconButton>
              <Box>
                <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                  <img src={Logo} alt="" width={180} />
                </Typography>
              </Box>
            </Box>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 3 }, background: (theme) => (theme.palette.grey[100]) }}
            >
              <Typography component="h1" variant="h3" align="center" sx={{ color: theme => theme.palette.primary.main }}>
                Cadastro
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, display: 'flex' }} alternativeLabel >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <SignupSuccess />
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
                          {activeStep !== 0 && (
                            <Button
                              type="button"
                              variant="contained"
                              color="inherit"
                              onClick={_handleBack}
                              disabled={isSubmitting}>
                              Voltar
                            </Button>
                          )}
                          <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="warning"
                            sx={{ paddingLeft: '0.5em' }}
                          >
                            {isLastStep ? 'Finalizar' : 'Próximo'}
                          </LoadingButton>
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
      </Box>
    </BaseLayout>
  );
}
