export const minLengthValidation= (value: string): string[] => {
    const errors: string[] = [];

    if(value.length < 2){
        errors.push("Must have at least two characters.")
    }
    return errors
}