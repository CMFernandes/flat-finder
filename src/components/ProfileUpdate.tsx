
import ReusableForm from "./ReusableForm"
import useFirestore from "../hooks/useFirestore";
import useFormHandler from "../hooks/useFormHandler"
import { UserData } from "../types/userData"
import { Dayjs } from "dayjs";


type UserProfile = {
    firstName: string;
    lastName: string;
    birthDate: Dayjs
}


export default function ProfileUpdate({user, setIsEditing}: { user: UserData; setIsEditing: React.Dispatch<React.SetStateAction<boolean>>}){
    const {updateDocument} = useFirestore("users");
     
    const {formData, errors, handleFieldChange, handleDateChange, validate} = useFormHandler<UserProfile>({
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate 
    })

    const handleProfileUpdate = async (formData: UserProfile ) => {
        try{
            await updateDocument(user.id,
                {...formData, 
                    birthDate: formData.birthDate.toDate()
                });
            setIsEditing(false)

        }catch (error) {
            console.error("Error updating profile:", error);
        }
    }  

    return (
        <ReusableForm
            onFormSubmit={handleProfileUpdate}
            title="Update Profile"
            formData={formData}
            errors={errors}
            handleFieldChange={handleFieldChange}
            handleDateChange={handleDateChange}
            validate={validate}
            fields={[
                {  
                    name: 'firstName', 
                    label: 'First Name',
                    type: 'text', 
                    required: true,
                }, 
                { 
                    name: 'lastName', 
                    label: 'Last Name',
                    type: 'text', 
                    required: true,
                },  
                { 
                    name: "birthDate", 
                    label: "Birth Date", 
                    type: "date", 
                    required: true,
                },
                    ]}
                />
    )
    
}