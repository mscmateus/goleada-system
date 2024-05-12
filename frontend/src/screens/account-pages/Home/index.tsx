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
import { LoadingContext } from '../../../Context/LoadingContext';
import ContaService from '../../../services/account.service';
import User from '../../../models/entity/user';


export default function UserHome() {
  const [usuarios, setUsuarios] = useState<Array<User>>(new Array<User>)
  const [loading, toggleLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
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

  useEffect(() => { }, []);


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
          <Box sx={{ m: 1 }}>
            <Grid container spacing={1}>
              <Grid item container spacing={1} xs={12} md={12} lg={12}>
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
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    )
  );
}
