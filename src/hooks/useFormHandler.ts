
import { useState } from "react"
import useValidation from "./useValidation";
import { Dayjs } from "dayjs";
import { uploadImageToCloudinary } from "../utils/uploadImageCloudinary";
                                                      
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useFormHandler<T extends Record<string, any>>(initialValues: T){
    const [formData, setFormData] = useState<T>(initialValues);
    const [fileName, setFileName] = useState<string | null>(null); 
    const [imagePreview, setImagePreview] = useState<string | null>(initialValues.imgUrl || null);
    const {validate, errors, setErrors} = useValidation<T>(formData);
    
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDateChange = (name: string, newDate: Dayjs) => {
        setFormData((prev) => ({
          ...prev,
          [name]: newDate,
        }));
    };
    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files && files.length > 0) {
            const file = files[0];

            const imgUrl = await uploadImageToCloudinary(file);

            if(imgUrl) {
                console.log("New Image URL being set:", imgUrl);
                setFormData((prevFile) => ({
                        ...prevFile,
                    [name]: imgUrl,
                }))
                setFileName(file.name)
                setImagePreview(imgUrl)
            }
        } ;
    };

    const resetForm = () => {
        setFormData(initialValues);
        setErrors({});
    };

    return({
        formData,
        errors,
        handleFieldChange,
        handleDateChange,
        handleFileChange,
        validate,
        resetForm,
        fileName,
        imagePreview
    })
};