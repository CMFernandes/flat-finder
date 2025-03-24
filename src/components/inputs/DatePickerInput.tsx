
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/index.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import { InputProps } from '../../types/inputProps';

export default function DatePickerInput({field, formData, errors, handleDateChange}: InputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={field.label}
        value={formData[field.name]}
        onChange={(newDate) => handleDateChange?.(field.name, newDate)}
        slotProps={{
          textField: {
          variant: 'outlined',
          error: !!errors[field.name],
          }
        }}
        minDate={field.name === "birthDate" ? dayjs().subtract(120, 'years') : dayjs()}
        maxDate={field.name === "birthDate" ? dayjs().subtract(18, 'years') : null}
      />
      {errors[field.name] && errors[field.name].map((error, index) => (
        <FormHelperText key={index} error>
          {error}
        </FormHelperText>
       ))}
    </LocalizationProvider>
  );
};