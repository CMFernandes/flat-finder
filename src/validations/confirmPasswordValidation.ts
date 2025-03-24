
export const confirmPasswordValidation = <T extends { password: string; confirmPassword: string }>(formData: T): string[] => {
    const errors: string[] = [];

    if(formData.confirmPassword !== formData.password){
        console.log(formData.confirmPassword);
        console.log(formData.password);
        errors.push("Passwords do not match.")
    }

    return errors
};