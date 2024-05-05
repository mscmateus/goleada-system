import IMask from 'imask';
import { useContext } from 'react'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, Button, CardHeader, Container, Grid, Modal, Paper, Typography, useTheme } from '@mui/material';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link as RouterLink } from 'react-router-dom';
import LoadingPage from '../../../components/LoadingPage';
import { NotaCompleta } from '../../../models/notaCompleta';
import { Usuario } from '../../../models/entidades/usuario';
import NotaService from '../../../services/nota.service';
import { LoadingContext } from '../../../Context/LoadingContext';
import { ResumoContaDto } from '../../../models/DTOs/resumoContaDto';
import ContaService from '../../../services/account.service';
import { Noticia } from '../../../models/entidades/noticia';
import NotaFiscalListItem from '../../../models/lista/notaFiscalListItem';


export default function UserHome() {
  const [usuarios, setUsuarios] = useState<Array<Usuario>>(new Array<Usuario>)
  const [loading, toggleLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
  const [resumoConta, setResumoConta] = useState<ResumoContaDto>({} as ResumoContaDto)
  const [notaCompleta, setNotaCompleta] = useState({
    id: 0,
    numero: 0,
    dataEmissao: "",
    chaveAcesso: "",
    razaoSocialEmitente: "",
    nomeFantasiaEmitente: "",
    cpfOuCnpjEmitente: "",
    ieEmitente: "",
    ufEmitente: "",
    enderecoEmitente: "",
    nomeDestinatario: "",
    cpfOuCnpjDestinatario: "",
    enderecoDestinatario: ""
  } as NotaCompleta);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   toggleLoading(false)
  // })

  let isCnpj = false;

  const formatarCPF = (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }; // Formatação do CPF: xxx.xxx.xxx-xx

  const formatarCNPJ = (cnpj: string): string => {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }; // Formatação do CNPJ: xx.xxx.xxx/xxxx-xx

  const formatarChaveDeAcesso = (chaveDeAcesso: string): string => {
    return chaveDeAcesso.replace(/(.{4})/g, '$1 ');
  }; // Formatação da chave de acesso: xxxx xxxx xxxx xxxx...

  let cpfOuCnpjFormatado: string = '';

  if (notaCompleta.cpfOuCnpjEmitente) {
    if (notaCompleta.cpfOuCnpjEmitente.length === 11) {
      isCnpj = false;
      cpfOuCnpjFormatado = formatarCPF(notaCompleta.cpfOuCnpjEmitente)
    } else if (notaCompleta.cpfOuCnpjEmitente.length === 14) {
      isCnpj = true;
      cpfOuCnpjFormatado = formatarCNPJ(notaCompleta.cpfOuCnpjEmitente)
    } else {
      cpfOuCnpjFormatado = notaCompleta.cpfOuCnpjEmitente; // Número inválido, não aplica formatação
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const masked = IMask.createMask({
    mask: '+7 (000) 000-00-00',
    // ...and other options
  });

  useEffect(() => {
    // masked.resolve('71234567890');
    // // now you can access masked value
    // console.log(masked.value);
    // // and get unmasked value
    // console.log(masked.unmaskedValue);
    ContaService.resumoConta().then((resumoConta) => {
      console.log(resumoConta)
      setResumoConta(resumoConta)
      toggleLoading(false);
    })
      .catch((error) => {
        toggleLoading(false);
      })
  }, []);


  return (
    loading ? (
      <LoadingPage />
    ) : (
      <Box sx={{ display: 'flex', flexGrow: '1' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}

        >

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bras%C3%A3o_do_Acre.svg/1200px-Bras%C3%A3o_do_Acre.svg.png' alt='Brasão do Estado do Acre' />
                }
                title="Governo do Estado do Acre"
                subheader="Secretaria da Fazenda"
              />
              <Typography variant="h5" component="h2" gutterBottom>Dados</Typography>
              <Typography variant="subtitle1">Número: {notaCompleta.numero}</Typography>
              <Typography variant="subtitle1">Chave de acesso: {formatarChaveDeAcesso(notaCompleta.chaveAcesso)}</Typography>
              <Typography variant="subtitle1">Data de emissão: <Moment format='DD/MM/YYYY HH:mm:ss'>{notaCompleta.dataEmissao}</Moment></Typography>
              <hr />
              <Typography variant="h5" gutterBottom>Emitente</Typography>
              <Typography variant="subtitle1">{isCnpj ? 'Razão social' : 'Nome'}: {notaCompleta.razaoSocialEmitente}</Typography>
              {isCnpj ? <Typography variant="subtitle1">Nome fantasia: {notaCompleta.nomeFantasiaEmitente}</Typography> : ''}
              <Typography variant="subtitle1">{isCnpj ? 'CNPJ do emitente' : 'CPF do emitente'}: {cpfOuCnpjFormatado}</Typography>
              <Typography variant="subtitle1">IE: {notaCompleta.ieEmitente}</Typography>
              <Typography variant="subtitle1">UF: {notaCompleta.ufEmitente}</Typography>
              <Typography variant="subtitle1">Endereço: {notaCompleta.enderecoEmitente}</Typography>
              <hr />
              <Typography variant="h5" gutterBottom>Destinatário</Typography>
              <Typography variant="subtitle1">Nome: {notaCompleta.nomeDestinatario}</Typography>
              <Typography variant="subtitle1">CPF: {formatarCPF(notaCompleta.cpfOuCnpjDestinatario)}</Typography>
              <Typography variant="subtitle1">Endereço: {notaCompleta.enderecoDestinatario}</Typography>
            </Box>
          </Modal>

          <Box sx={{ m: 1 }}>
            <Grid container spacing={1}>
              <Grid item container spacing={1} xs={12} md={12} lg={12}>
                {/* resumos */}
                <Grid item xs={12} md={6} lg={4}>
                  <Paper sx={{ p: 2, background: theme.palette.secondary.main, color: '#FFF' }}>
                    <Grid container style={{ display: "flex", alignItems: "center" }}>
                      <ConfirmationNumberRoundedIcon sx={{ marginRight: 1, fontSize: theme.spacing(8) }} />
                      <Grid >
                        <Typography variant="h5">{resumoConta.totalBilhetes}</Typography>
                        <Typography variant="subtitle1">Bilhetes Atuais</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper sx={{ p: 2, background: theme.palette.secondary.main, color: '#FFF' }}>
                    <Grid container style={{ display: "flex", alignItems: "center" }}>
                      <EmojiEventsRoundedIcon sx={{ marginRight: 1, fontSize: theme.spacing(8) }} />
                      <Grid >
                        <Typography variant="h5">{resumoConta.totalPontos}</Typography>
                        <Typography variant="subtitle1">Pontos Atual</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper sx={{ p: 2, background: theme.palette.secondary.main, color: '#FFF' }}>
                    <Grid container style={{ display: "flex", alignItems: "center" }}>
                      <RequestQuoteRoundedIcon sx={{ marginRight: 1, fontSize: theme.spacing(8) }} />
                      <Grid >
                        <Typography variant="h5">{resumoConta.totalNotasFiscais}</Typography>
                        <Typography variant="subtitle1">Notas no Mês</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* corpo */}
                <Grid item xs={12} md={12} lg={8} sx={{ display: 'flex', justifyContent: 'top' }}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                          <Grid container style={{ display: "flex", flexDirection: "row" }}>
                            <Grid container style={{ display: "flex", alignItems: "center", paddingBottom: 10 }}>
                              <ApartmentOutlinedIcon color="primary" style={{ fontSize: "4em" }} sx={{ marginRight: "0.2em" }} />
                              <Grid>
                                <Typography component="h2" color="primary" variant="h6">Instituição Apoiada</Typography>
                                <Typography component="h3" color="primary" variant="subtitle1">Atualmente você está apoiando: Alcoolicos Não anonimos</Typography>
                                <Button component={RouterLink} to="#">
                                  <InstagramIcon sx={{ marginRight: 1 }} />Instagram
                                </Button>
                                <Button component={RouterLink} to="#">
                                  <FacebookIcon sx={{ marginRight: 1 }} />Facebook
                                </Button>
                                <Button component={RouterLink} to="#">
                                  <LinkOutlinedIcon sx={{ marginRight: 1 }} />Site
                                </Button>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Button component={RouterLink} to="#" variant='contained'>
                                <EditIcon sx={{ marginRight: 1 }} />Alterar
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", alignItems: "center" }} >
                          <Typography component="h2" variant="h6" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Minhas Últimas Notas Fiscais</Typography>
                        </Paper>
                      </Grid>
                      {resumoConta.notasFiscais?.map((notaFiscal: NotaFiscalListItem) => (
                        <Grid item xs={12}>
                          <Paper sx={{ p: 2 }}>
                            <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                              <Grid container sx={{ display: "flex", alignItems: "center", paddingBottom: 2 }}>
                                <RequestPageIcon color="primary" sx={{ marginRight: "0.2em", fontSize: "4em" }} />
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }} className=''>
                                  <Grid>
                                    <Typography component="h2" color="primary" variant="h6">Nota {notaFiscal.identificador}</Typography>
                                    <Typography component="h3" color="primary" variant="subtitle1">Emitente: {notaFiscal.nomeEmitente}</Typography>
                                    <Typography component="h3" color="primary" variant="subtitle1">Data de emissão: <Moment format='DD/MM/YYYY'>{notaFiscal.dataEmissao}</Moment></Typography>
                                    <Typography component="h3" color="primary" variant="subtitle1">Número de Itens: {notaFiscal.quantidadeDeProdutos}</Typography>
                                    <hr />
                                    <Typography component="h3" color="primary" variant="subtitle1">Valor Total: {notaFiscal.valorTotal}</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Button onClick={handleOpen} variant='contained'>
                                  <VisibilityIcon sx={{ marginRight: 1 }} />Visualizar
                                </Button>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      ))}
                      <Button>Ver Todas as Notas</Button>

                      <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", alignItems: "center" }} >
                          <Typography component="h2" variant="h6" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Último Sorteio</Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                {/* Noticias */}
                <Grid item container xs={12} md={12} lg={4} spacing={1}>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", alignItems: "center" }} >
                      <Typography component="h2" variant="h6" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Notícias</Typography>
                    </Paper>
                  </Grid>
                  {resumoConta.noticias ? resumoConta.noticias.map((noticia: Noticia) => (
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant='h6'>{noticia.titulo}</Typography>
                        <Typography variant='caption'>{noticia.dataCadastro}</Typography>
                        <Typography variant='body2'>{noticia.resumo}</Typography>
                        <Button>Ver mais</Button>
                      </Paper>
                    </Grid>
                  )) : null}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    )
  );
}
