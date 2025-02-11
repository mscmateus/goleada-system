import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import TextField from "@mui/material/TextField";

export default function InputField(props: any) {
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <TextField
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()}
            {...field}
            {...rest}
        />
    );
}
