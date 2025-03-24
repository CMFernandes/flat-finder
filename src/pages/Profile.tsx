import useFirestore from "../hooks/useFirestore";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import {  useParams } from "react-router-dom";
import { UserData } from "../types/userData";
import ProfileUpdate from "../components/ProfileUpdate";
import ProfileDetails from "../components/ProfileDetails";
import { CircularProgress } from "@mui/material";

export default function Profile() {
    const { userId } = useParams();

    const { queryById} = useFirestore("users");

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [user, setUser] = useState<UserData | null>(null);
    
    const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoadingProfile(true);

                if(!userId){
                    return
                }

                const userData = await queryById<UserData>(userId);
                    
                if(userData){
                    setUser({
                        ...userData,
                        birthDate: dayjs(userData.birthDate?.toDate()),
                    });
                }
            } catch (error) {
                console.error("error fetching profile", error)
            }finally{
                setLoadingProfile(false);
            }
        };
       
        fetchUser();
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
