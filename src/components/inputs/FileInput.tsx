import { Box, Button, Typography } from "@mui/material";
import { InputProps } from "../../types/inputProps";

type FileInputProps = Omit<InputProps, "formData"> 

export default function FileInput({field, fileName, errors, handleFileChange}: FileInputProps) {
    return (
        <Box> 
            <Typography variant="h6" gutterBottom color='text.primary'>Upload an Image</Typography>
            <Button 
                variant="contained" 
                component="label" 
                sx={{ marginBottom: 1 }}
            >
                Choose File
                <input 
                    type="file" 
                    name={field.name}
                    hidden 
                    onChange={handleFileChange}
                />
            </Button>
                <Typography variant="body1" color="textSecondary">
                    {fileName ? `File selected: ${fileName}` : 'No file selected'}
                </Typography>
                {errors[field.name] && (
                    <Typography variant="body2" color="error">
                        {errors[field.name]}
                    </Typography>
                )}
        </Box>
    )
}  