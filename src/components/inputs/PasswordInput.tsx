import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { useState } from "react";
import { InputProps } from "../../types/inputProps";



export default function PasswordInput({field, formData, errors, handleFieldChange}: InputProps) {
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
    
    const handleClickShowPassword = (fieldName: string) => {
        setShowPassword((prevState) => ({
          ...prevState,
            [fieldName]: !prevState[fieldName]
        }));
    }
    return (
        <FormControl variant='filled' fullWidth error={!!errors[field.name]}>
                <InputLabel htmlFor={`password-${field.name}`}>{field.label}</InputLabel>
                <FilledInput
                    id={`password-${field.name}`}
                    name={field.name}
                    type={showPassword[field.name] ? "text" : "password"}
                    value={formData[field.name] || ''}
                    onChange={handleFieldChange}
                    required={field.required}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleClickShowPassword(field.name)} edge="end">
                                {showPassword[field.name] ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText sx={{ marginLeft: 0 }}>
                    {errors[field.name] && errors[field.name].map((error, index) => <span style={{ display: 'block' }} key={index}>{error}</span>)}
                </FormHelperText>
        </FormControl>
    )
}