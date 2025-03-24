export const passwordValidation = (value: string): string[]=> {
  const errors: string[] = [];

  if (value.length < 6){
    errors.push("Password must be at least 6 characters long.")
  } 

  if (!/[A-Za-z]/.test(value)){
    errors.push("Password must contain at least one letter.")
  } 

  if (!/\d/.test(value)){
    errors.push("Password must contain at least one number.")
  } 

  if (!/[^A-Za-z0-9]/.test(value)){
    errors.push("Password must contain at least one special character.")
  } 

  return errors
 
};