import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
  Radio,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@mui/material";

export default function RadioField(props: any) {
  const { label, data, fullWidth, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <FormControl fullWidth {...rest} error={meta.touched && Boolean(meta.error) && true}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
		{...field} onChange={_onChange}
		value={field.value}
      >
		{data.map((item: any, index: any) => (
               <FormControlLabel control={<Radio />} key={index} value={item.value}
                  label={item.label}
               />
            ))}
      </RadioGroup>
	  {_renderHelperText()}
    </FormControl>
  );
}
