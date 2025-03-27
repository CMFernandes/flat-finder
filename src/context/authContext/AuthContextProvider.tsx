import useAuth from "../../hooks/useAuth";
import { PropsWithChildren, useState, useEffect } from "react";
import {  UserData } from "../../types/userData";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestoreDB } from "../../config/firebase";
import useFirestore from "../../hooks/useFirestore";

import { AuthContext } from "./AuthContext";
import dayjs from "dayjs";
import { doc, onSnapshot } from "firebase/firestore";


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
        if (currentUser) {
            const userRef = doc(firestoreDB, "users", currentUser.id);

            const unsubscribeSnapshot = onSnapshot(userRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const updatedUserData = docSnapshot.data() as UserData;
                    setCurrentUser((prevState) => ({
                        ...prevState,
                        ...updatedUserData,
                        birthDate: dayjs(updatedUserData.birthDate?.toDate()),
                    }));
                }
            });

            return () => unsubscribeSnapshot();
        }
    }, [currentUser]);

    
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