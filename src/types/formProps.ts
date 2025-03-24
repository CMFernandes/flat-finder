import { Dayjs } from "dayjs";

export type FormProps<T> =  {
  onFormSubmit: (formData: T) => Promise<void>;
  title: string;
  formData: T;
  errors: { [key: string]: string[] };
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange?: (name: string, newDate: Dayjs) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "password" | "date" | "number" | "checkbox" | "file" | "textarea";
    required?: boolean;
  }>) => boolean;
  fileName?: string | null;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "password" | "date" | "number" | "checkbox" | "file"| "textarea";
    required?: boolean;
  }>;
  imagePreview?:string | null
}
