import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Grid from '@mui/material/Grid';

import { LocalizationProvider, DatePicker, ptBR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import br from 'dayjs/locale/pt-br';

export default function DatePickerField(props: any) {
	const [field, meta, helper] = useField(props);
	const { touched, error } = meta;
	const { setValue } = helper;
	const isError = touched && error && true;
	const { value } = field;
	const [selectedDate, setSelectedDate] = useState<any>(null);

	// useEffect(() => {
	// 	console.log(value)
	// })
	useEffect(() => {
		if (value) {
			const date = new Date(value);
			setSelectedDate(date ? moment(date, 'DD/MM/YYYY') : '');
		}
	}, [value]);

	function _onChange(date: any) {
		if (date) {
			setSelectedDate(date);
			try {
				const ISODateString = date.toISOString();
				setValue(ISODateString);
			} catch (error) {
				setValue(date);
			}
		} else {
			setValue(date);
		}
	}

	return (
		<Grid container>
			
				<DatePicker

					format="DD/MM/YYYY"
					onChange={_onChange}
					disableFuture={props.disableFuture}
					slotProps={{
						textField: {
							error: isError,
							...props,
							name: field.name,
							value: selectedDate
						}
					}}
				/>
		</Grid>
	);
}