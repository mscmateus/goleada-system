import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import {
   InputLabel,
   FormControl,
   Select,
   MenuItem,
   FormHelperText,
   TextField,
   Autocomplete
} from '@mui/material';

function AutoCompleteField(props: any) {
   const { label, data, ...rest } = props;
   const [field, meta] = useField(props);
   const { value: value } = field;
   useEffect(() => {
      console.log(props)
   }, [])
   function _renderHelperText() {
      const [touched, error] = at(meta, 'touched', 'error');
      if (touched && error) {
         return error;
      }
   }

   return (
      <Autocomplete
         {...field}
         {...rest}
         options={data}
         renderInput={(params) => <TextField
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()} {...params}
            {...rest}
            label={label} />}
      />
   );
}

export default AutoCompleteField;
