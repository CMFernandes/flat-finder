import { TextField } from "@mui/material";
import { InputProps } from "../../types/inputProps";


export default function TextareaInput({field, formData, errors, handleFieldChange}: InputProps) {
    return (
        <TextField
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleFieldChange}
            required={field.required}
            multiline
            rows={4} 
            variant="outlined"
            sx={{ width: "100%" }}
            error={!!errors[field.name]}
            helperText={errors[field.name] && errors[field.name].map((error, index) => <div key={index}>{error}</div>)}
        />
    )
}