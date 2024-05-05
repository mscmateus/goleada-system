import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Button, Link, TextField, LinearProgress, CircularProgress } from '@mui/material'
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { Link as RouterLink } from 'react-router-dom';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EditIcon from '@mui/icons-material/Edit';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Logo from '../../assets/imgs/nota-premiada-logo.svg'


export default function LoadingPage() {
   return (
      <Box
         sx={{
            backgroundColor: (theme) =>
               theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}
      >
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h3'>
               <img src={Logo} width={'200em'} />
            </Typography>
            <Box sx={{ width: '100%' }}>
               <LinearProgress />
            </Box>
         </Box>
      </Box>
   );
}
