import { FormHelperText, OutlinedInput } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useField } from 'formik';
import { at } from 'lodash';
import React from 'react';
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
        React.useEffect(() => {
        })
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

export default function MaskInputField(props: any) {
    const { errorText, onChange, mask, definitions, ...rest } = props;
    const [field, meta] = useField(props);

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }
    return (
        <FormControl
            fullWidth
            error={meta.touched && Boolean(meta.error) && true}>
            <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
            <OutlinedInput
                {...field}
                {...rest}
                inputProps={{ onChange, mask, definitions, ...rest, style: props.style }}
                inputComponent={InputMask as any}
            />
            <FormHelperText >
                {_renderHelperText()}
            </FormHelperText>
        </FormControl>
    );
}
