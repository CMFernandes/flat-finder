import { TextField } from "@mui/material";
import { InputProps } from "../../types/inputProps";

export default function DefaultInput({field, formData, errors, handleFieldChange}: InputProps) {
    return (
        <TextField
            variant="filled"
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={handleFieldChange}
            required={field.required}
            error={!!errors[field.name]}
            fullWidth
            helperText={errors[field.name] && errors[field.name].map((error, index) => <span style={{ display: 'block' }} key={index}>{error}</span>)}
        />
    )
}