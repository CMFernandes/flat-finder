import { Dayjs } from "dayjs";

export const requiredValidation = (value: string | Dayjs | number): string[] => {
    const errors: string[] = [];

    if (!value || (typeof value === 'string' && value.trim() === '') ||(typeof value === 'number' && isNaN(value)) || value === null) {
        errors.push("This field is required")
    }

    return errors
}