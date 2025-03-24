import { Dayjs } from "dayjs";

export type InputProps = {
    field: {
        name: string;
        label: string;
        type: "text" | "email" | "password" | "date" | "number" | "checkbox" | "file" | "textarea";
        required?: boolean;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: Record<string, any>;
    errors: { [key: string]: string[] };
    handleFieldChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange?: (name: string, newDate: Dayjs) => void;
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName?: string | null
}