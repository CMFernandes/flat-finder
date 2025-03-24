import useAuth from "../../hooks/useAuth";
import { PropsWithChildren, useState, useEffect } from "react";
import {  UserData } from "../../types/userData";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import useFirestore from "../../hooks/useFirestore";

import { AuthContext } from "./AuthContext";
import dayjs from "dayjs";


export const AuthContextProvider = ({ children }: PropsWithChildren) => {

    const [currentUser, setCurrentUser] = useState<UserData | null>(null)
    const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {login, signUp, logout } = useAuth();

    const {queryById} = useFirestore("users");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            const handleAuthStateChange = async () => {
                if (_user) {
                    try {
                        const userData = await queryById<UserData>(_user.uid)
                        if(userData){
                            setCurrentUser({
                                ...userData,
                                birthDate: dayjs(userData.birthDate.toDate()),

                            });
                            setHasLoggedIn(true);
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }
                } else{
                    console.log("No user is signed in");
                    setCurrentUser(null);
                    setHasLoggedIn(false);
                }
                setIsLoading(false);
            }
            handleAuthStateChange();
        })

        return () => unsubscribe();
    },[]);

    useEffect(() => {
        console.log(currentUser)
    })
    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser,
            hasLoggedIn,
            isLoading,
            login,
            signUp,
            logout,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
} 