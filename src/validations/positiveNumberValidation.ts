export const positiveNumberValidation= (inputNumber: number) => {
    const errors: string[] = [];

    if (isNaN(inputNumber) || inputNumber <= 0) {
        errors.push("Must be a positive number.")
    } 

    return errors;
};