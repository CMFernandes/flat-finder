import { useState } from "react";
import Form from "../components/ReusableForm";
import useFormHandler from "../hooks/useFormHandler"

import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";


export type LoginUserData = {
    email: string;
    password: string;
}


export default function LoginForm() {
    const [error, setError] = useState<{[key: string]: string[]}>({});

    const navigate = useNavigate();
    
    const {login} = useAuthContext();
    
    const {formData, handleFieldChange }  = useFormHandler<LoginUserData>({
        email: "",
        password: "",
    });


    const handleLogin = async() => {
        try{
            await login(formData.email, formData.password);
            
            navigate("/")
        }catch(error){
            if (error instanceof Error) {
                console.error("login failed:", error)

                setError({general: [error.message]})
            } else {
                console.error("login failed: An unknown error occurred");
                setError({ general: ["An unknown error occurred"] });
            }
        }
    }

    return (
        <Form
            onFormSubmit={handleLogin}
            title="Login"
            formData={formData}
            errors={error}
            handleFieldChange={handleFieldChange}
            fields={[
                {
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                },
                {
                    name: "password",
                    label: "Password",
                    type: "password",
                    required: true,
                }
            ]}
        >   
        </Form>

    )
}