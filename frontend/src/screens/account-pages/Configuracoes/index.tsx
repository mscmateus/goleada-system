import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, Typography } from '@mui/material'
import React from 'react'
import { Email as EmailChangeIcon, Person as MyDataIcon, AdminPanelSettings as PrivacyIcon, Delete as DeleteIcon, Logout as LogoutIcon, Password as PasswordIcon } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';
import UsuarioService from '../../../services/account.service';
import AuthService from '../../../services/auth.service';


export default function configuracoes() {

  const handleLogout = () => {
    AuthService.logout()
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Configurações da Conta
      </Typography>
      <List>
        <ListItemButton href='/conta/meus-dados' LinkComponent={Link}>
          <ListItemIcon>
            <MyDataIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Meus Dados" secondary="Confira seus dados pessoais e de endereço" />
        </ListItemButton>
        <ListItemButton href='/conta/alterar-senha' LinkComponent={Link}>
          <ListItemIcon>
            <PasswordIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Alterar Senha" secondary="Alterar senha de acesso" />
        </ListItemButton>
        <ListItemButton href='/conta/alterar-email' LinkComponent={Link}>
          <ListItemIcon>
            <EmailChangeIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Alterar Email" secondary="Alterar endereço de email da conta" />
        </ListItemButton>
        <ListItemButton href='/conta/privacidade' LinkComponent={Link}>
          <ListItemIcon>
            <PrivacyIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Privacidade" secondary="Informaçõse sobre privacidade e termos de uso" />
        </ListItemButton>
        <ListItemButton href='/conta/apagar' LinkComponent={Link}>
          <ListItemIcon>
            <DeleteIcon color='error' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Excluir Conta" secondary="Remover sua conta" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Container>
  )
}
