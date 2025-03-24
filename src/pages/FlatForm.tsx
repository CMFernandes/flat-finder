import dayjs from "dayjs";
import ReusableForm from "../components/ReusableForm";
import { FlatData} from "../types/flatData";
import useFormHandler from "../hooks/useFormHandler";

import useAuthContext from "../hooks/useAuthContext";

import useFlats from "../hooks/useFlats";
import { useNavigate } from "react-router-dom";



export default function FlatForm() {
    const {addFlat} = useFlats();
    const {currentUser} = useAuthContext();
    const navigate = useNavigate()

    const { formData, errors, handleFieldChange,handleDateChange, handleFileChange, validate, fileName,imagePreview } = useFormHandler<FlatData>({
        imgUrl: "",
        city: "",
        streetName: "",
        streetNumber: 0,
        areaSize: 0,
        hasAC: false,
        yearBuilt: 0,
        rentPrice: 0,
        dateAvailable: dayjs(),
        flatOwnerId: "",
        id: "",
    });

    const handleAddFlat = async(flatData: FlatData) => {
        if(currentUser){
            const dataWithOwnerId = {...flatData, flatOwnerId: currentUser.id};
            
            await addFlat(dataWithOwnerId)
            navigate("/my-flats")
            
        }else{
            console.error("errors handling add flat ")
        }
    }

        return(
            <ReusableForm
                onFormSubmit={handleAddFlat}
                title="New Flat"
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
                        required: true,
                    },
                   
                ]}
            >    
        </ReusableForm>
    )
}