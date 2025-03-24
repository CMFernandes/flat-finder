import { Dayjs } from "dayjs"
import { calculateAge } from "../utils/dateUtils"


export const ageValidation = (birthDate: Dayjs ): string[] => {
    const errors: string[] = [];

    const age = calculateAge(birthDate);

    if(age < 18 || age > 120 ) {
        errors.push("Age must range between 18 and 120 years.");
    }
    
    return errors
}