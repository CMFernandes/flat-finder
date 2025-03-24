import React from 'react';
import { Button, Alert, Box} from '@mui/material';

import { FormProps } from '../types/formProps';

import { useNavigate } from 'react-router-dom';

import PasswordInput from './inputs/PasswordInput';
import Title from './Title';
import DatePickerInput from './inputs/DatePickerInput';
import CheckboxInput from './inputs/CheckboxInput';
import FileInput from './inputs/FileInput';
import TextareaInput from './inputs/TextareaInput';
import DefaultInput from './inputs/DefaultInput';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReusableForm <T extends Record<string, any>>({ 
  onFormSubmit,
  title,
  formData,
  errors,
  handleFieldChange,
  handleDateChange,
  handleFileChange,
  validate,   
  fileName,
  fields,
  imagePreview
}: FormProps<T>){

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if(typeof validate === "function"){
        const isValid = validate(fields);

        if (!isValid) {
          console.log("Validation failed:", errors);
          return;
        }
      }
    onFormSubmit(formData);
  };
  
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: '2rem auto ',
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
        <Title title={title}/>
        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
          {fields.map((field) => (
            <Box key={field.name} sx={{ marginBottom: 2 }}>
              {field.type === "password" ? (

                <PasswordInput field={field} formData={formData} errors={errors} handleFieldChange={handleFieldChange}/>
             
              ) : field.type === "date" ? (

                <DatePickerInput field={field} formData={formData} errors={errors} handleDateChange={handleDateChange}/>
              
              ) : field.type === "checkbox" ? (

                <CheckboxInput field={field} formData={formData} errors={errors} handleFieldChange={handleFieldChange}/>
              
              ) : field.type === "file" ? (
                
                <FileInput field={field} fileName={fileName} errors={errors} handleFileChange={handleFileChange}/>

              ) : field.type === "textarea" ? (

                <TextareaInput field={field} formData={formData} errors={errors} handleFieldChange={handleFieldChange}/>

              ):(
                <DefaultInput field={field} formData={formData} errors={errors} handleFieldChange={handleFieldChange}/>
              )}
            </Box>
          ))}

          {errors.general && (
            <Alert severity="error" style={{ marginBottom: '20px' }}>
              {errors.general}
            </Alert>
          )}

          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Selected Image" 
              style={{ width: "250px", marginTop: 10, borderRadius: "5px" }} 
            />
          )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
              <Button type="button" variant="contained" color="inherit" onClick={handleCancel} fullWidth>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Box>
        </Box>
      </form>
    </Box>
  ) 
};

export default ReusableForm;


