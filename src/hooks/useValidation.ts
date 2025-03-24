import { useState } from "react"
import { validationStrategies} from "../validations/validationStrategies";
import { Dayjs } from "dayjs";
import { ValidationFn } from "../types/validationFn";


type ValidationStrategiesType = typeof validationStrategies
type ValidationKeys = keyof ValidationStrategiesType;

type Errors= { [key: string]: string[] }

export default function useValidation<T extends Record<string,  string | number | Dayjs | Array<string>>>(formData: T) {
    const [errors, setErrors] = useState<{[key: string]: string[]}>({})

    const validate = () => {
        const validationErrors: Errors = {};

        Object.keys(formData).forEach((key) => {
            if (!(key in validationStrategies)) return;

            const value = formData[key as keyof T];

            const fieldValidators = validationStrategies[key as ValidationKeys];
            
            if (fieldValidators) {
                    fieldValidators.forEach((validator) => {
                        
                        let errorMessages: string[] ;

                        if (key === "confirmPassword") {
                            errorMessages = (validator as ValidationFn<T>)(formData )
                        }else if (typeof value === "string") {
                            errorMessages = (validator as ValidationFn<string>)(value)
                        } else if (typeof value === "number") {
                            errorMessages = (validator as ValidationFn<number>)(value);
                        } else {
                            errorMessages = (validator as ValidationFn<Dayjs>)(value as Dayjs);
                        }

                        if (errorMessages?.length){
                            if(!validationErrors[key]) {
                                validationErrors[key] = [];
                            }
                            validationErrors[key] = [...validationErrors[key], ...errorMessages]
                        };
                    });
               };
        });
       
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; 
    };
    return({
        validate,
        errors,  
        setErrors
    })
};