export const emailValidation= (value:string): string[] => {
    const errors: string[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(value)){
        errors.push( "Please enter a valid email address.")
    }
    return errors
}