import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import InputField from "../../../../components/FormikFields/InputField";
import { Box } from "@mui/material";

export default function EmailForm(props: any) {

   const {
      formField: {
         email,
      }
   } = props;
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            Autenticação
         </Typography>
         <Typography variant="body1">Insira seu novo E-Mail no campo abaixo:</Typography>
         <Grid container spacing={3} py={4}>
            <Grid>
               <InputField
                  type="text"
                  name={email.name}
                  label={email.label}
               />
            </Grid>
         </Grid >
      </React.Fragment >
   );
}