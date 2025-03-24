import { Checkbox, FormControlLabel } from "@mui/material";
import { InputProps } from "../../types/inputProps";


export default function CheckboxInput({field, formData, handleFieldChange}: InputProps) {
    return (
        <FormControlLabel
            label={field.label}
            control={
            <Checkbox
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleFieldChange}
                    sx={{
                        color: "primary.main",
                        '&.Mui-checked': {
                          color: "primary.main",
                        }
                      }}
                    />
                }
            />
    )
}