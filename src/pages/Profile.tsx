import { useEffect, useState } from "react";

import dayjs from "dayjs";

import {  useParams } from "react-router-dom";
import { UserData } from "../types/userData";
import ProfileUpdate from "../components/ProfileUpdate";
import ProfileDetails from "../components/ProfileDetails";
import { CircularProgress } from "@mui/material";
import { firestoreDB } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Profile() {
    const { userId } = useParams();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [user, setUser] = useState<UserData | null>(null);
    
    const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

    useEffect(() => {
        if(!userId) return
        
        setLoadingProfile(true);
        
        const userRef = doc(firestoreDB, "users", userId);

        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data() as UserData;
                setUser({
                    ...userData,
                    birthDate: dayjs(userData.birthDate?.toDate()),
                });
            } 
            setLoadingProfile(false);
        });
    
        return () => unsubscribe(); 
    }, [userId]);

   

    if(loadingProfile){
        return <CircularProgress color="primary" />
    }
    
    if(!user){
        return
    }
    
    return (
        <div>
            {isEditing ? (
                <ProfileUpdate user={user} setIsEditing={setIsEditing}/> 
            ) : (
               <ProfileDetails user={user} setIsEditing={setIsEditing} />
            
            )}
        </div>
    )
}
