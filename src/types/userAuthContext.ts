import { SignUpUser } from "../pages/SignUpForm";
import {  UserData } from "./userData"

export type UserAuthContext = {
    currentUser: UserData | null ; 
    setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    hasLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<UserData | undefined>;
    logout: () => Promise<void>;
    signUp: (data: SignUpUser) => Promise<UserData | undefined>;
}
