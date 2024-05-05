import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Button, FormHelperText, OutlinedInput } from "@mui/material";
import { IMaskInput } from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    mask: string;
    definitions: {
        '#': RegExp;
    }
}

const InputMask = React.forwardRef<HTMLElement, CustomProps>(
    function CpfMask(props, ref) {
        const { onChange, mask, definitions, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask={mask}
                definitions={definitions}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export default function MaskField(props: any) {
    const { onChange, mask, definitions, touched, error, ...rest } = props;

    function _renderHelperText() {
        const [touched, error] = at('touched', 'error');
        if (touched && error) {
            return error;
        }
    }
    return (
        <FormControl
            fullWidth
            error={touched && Boolean(error) && true}>
            <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
            <OutlinedInput
                {...rest}
                inputprops={{ onChange, mask, definitions, ...rest, style: props.style }}
                inputComponent={InputMask as any}
            />
            <FormHelperText >
                {_renderHelperText()}
            </FormHelperText>
        </FormControl>
    );
}
