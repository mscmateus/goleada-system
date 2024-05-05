import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

export default function DateField(props: any) {
	const { setValue, value, error, readOnly } = props;
	const isError = error && true;
	const [selectedDate, setSelectedDate] = useState<any>(null);

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
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					format="DD/MM/YYYY"
					disableFuture
					readOnly={readOnly}
					onChange={_onChange}
					slotProps={{
						textField: {
							...props,
							error: isError,
							value: selectedDate
						}
					}}
				/>
			</LocalizationProvider>
		</Grid>
	);
}