import { FlatData } from "../types/flatData";

import useFormHandler from "../hooks/useFormHandler";
import  dayjs from "dayjs";
import ReusableForm from "../components/ReusableForm";


import useFlats from "../hooks/useFlats";

type EditFlatProps =  {
    flat: FlatData;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setFlat: React.Dispatch<React.SetStateAction<FlatData | null>>
}


export default function EditFlat({flat, setIsEditing, setFlat}: EditFlatProps) {

    const { updateFlat} = useFlats()

    const {formData, errors, handleFieldChange, handleDateChange, handleFileChange, validate, fileName, imagePreview} = useFormHandler<FlatData>({
        imgUrl: flat.imgUrl ,
        city: flat.city,
        streetName: flat.streetName,
        streetNumber: flat.streetNumber,
        areaSize: flat.areaSize,
        hasAC: flat.hasAC,
        yearBuilt: flat.yearBuilt,
        rentPrice: flat.rentPrice,
        dateAvailable: dayjs(flat.dateAvailable.toDate()),
        flatOwnerId: flat.flatOwnerId,
        id: flat.id,
    })

    const handleEditFlat = async (flatData : FlatData ) => {
        try {
            await updateFlat(flatData.id, flatData)
            setIsEditing(false)
            setFlat(flatData)
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <ReusableForm
            onFormSubmit={handleEditFlat}
            title="Edit Flat"
            formData={formData}
            errors={errors}
            handleFieldChange={handleFieldChange}
            handleDateChange={handleDateChange}
            handleFileChange={handleFileChange}
            validate={validate}
            fileName={fileName}
            imagePreview={imagePreview}
            fields={[
                {
                    name: "city",
                    label: "City",
                    type: "text",
                    required: true,
                },
                {
                    name: "streetName",
                    label: "Street",
                    type: "text",
                    required: true,
                },
                {
                    name: "streetNumber",
                    label: "Street number",
                    type: "number",
                    required: true,
                },
                {
                    name: "areaSize",
                    label: "Area size",
                    type: "number",
                    required: true,
                },
                {
                    name: "yearBuilt",
                    label: "Year of Built",
                    type: "number",
                    required: true,
                },
                {
                    name: "rentPrice",
                    label: "Rent price",
                    type: "number",
                    required: true,
                },
                {
                    name: "hasAC",
                    label: "Has AC",
                    type: "checkbox",
                    required: true,
                },
                {
                    name: "dateAvailable",
                    label: "Available in",
                    type: "date",
                    required: true,
                },
                {
                    name: "imgUrl",
                    label: "Upload Image",
                    type: "file",
                    required: false,
                },
               
            ]}
        > 
        </ReusableForm>
    )
}