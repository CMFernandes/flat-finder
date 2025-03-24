import { useNavigate } from 'react-router-dom';
import useFormHandler from '../hooks/useFormHandler';

import  dayjs from 'dayjs';
import { UserData } from '../types/userData';
import ReusableForm from '../components/ReusableForm';
import useAuthContext from '../hooks/useAuthContext';



export type SignUpUser = Omit<UserData, "id"> & {
    password: string,
    confirmPassword: string,
}

export default function SignUpForm(){
    const navigate = useNavigate();
    const {signUp} = useAuthContext();

    const { formData, errors, handleFieldChange,handleDateChange, validate } = useFormHandler<SignUpUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: dayjs().subtract(18, "year"),
        role: "user",
        favouriteFlats: []
    });

    const handleSignUp = async (userData: SignUpUser) => {
        await signUp(userData)
        navigate("/")
    } 

    return (
        <ReusableForm
            onFormSubmit={handleSignUp}
            title="Sign Up"
            formData={formData as SignUpUser}
            errors={errors}
            handleFieldChange={handleFieldChange}
            handleDateChange={handleDateChange}
            validate={validate}
            fields={ [
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
                    name: 'email', 
                    label: 'Email', 
                    type: 'email', 
                    required: true,
                } ,
                { 
                    name: 'password', 
                    label: 'Password', 
                    type: 'password', 
                    required: true ,
                },  
                {
                    name: "confirmPassword",
                    label: "Confirm password",
                    type: "password",
                    required: true , 
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