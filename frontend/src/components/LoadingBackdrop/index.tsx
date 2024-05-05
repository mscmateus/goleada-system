import { Backdrop, Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'

export default function LoadingBackdrop() {
   return (
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, overflowY: 'hidden' }}
         open={true}
      >
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h3'>Nota Premiada</Typography>
            <Box sx={{ width: '100%' }}>
               <LinearProgress />
            </Box>
         </Box>
      </Backdrop>
   )
}
