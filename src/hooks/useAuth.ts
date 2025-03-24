import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth"

import { auth }  from "../config/firebase";
import {  UserData } from "../types/userData";

import useFirestore from "./useFirestore";
import { SignUpUser } from "../pages/SignUpForm";
import dayjs from "dayjs";


export type UserFirestoreData = Omit<UserData, "birthDate"> & {
    birthDate: Date;
}; 

export default function useAuth() {
    const {addUserDocument, queryById} = useFirestore("users");

    const signUp = async (newUser: SignUpUser) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
          const _user = userCredential.user;

          const newUserData: UserFirestoreData= {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            birthDate: newUser.birthDate.toDate(),
            id: _user.uid,
            role: "user",
            favouriteFlats: [],
          } 

          addUserDocument(_user.uid, newUserData)
          return {
            ...newUserData,
            birthDate: dayjs(newUserData.birthDate),
            };

        } catch (error) {
            if (error instanceof Error) {
                console.error("Error signing up user: ", error);
                throw error;
            } else {
                console.error("An unknown error occurred");
            }
          
        };
    };
    
    const login = async (email: string, password: string)=> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const firebaseUser = userCredential.user;
    
            const user = await queryById<UserData>(firebaseUser.uid);
            
            if(user){
                return  {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    birthDate: dayjs(user.birthDate),
                    id: user.id,
                    role: user.role,
                    favouriteFlats: user.favouriteFlats,
                };
            }
        } catch (error) {
            if (error instanceof Error) {

                throw new Error("Invalid email or password.");                
            } else {
                console.error("An unknown error occurred");
            }
        };
    };

    const logout = async () => {
        try {
            await signOut(auth)

        }catch (error: unknown){
            if (error instanceof Error) {
                console.error("Error signing out useAuth", error.message)
              } else {
                console.error("An unknown error occurred");
              }
          
        }
    }

    return {
        signUp,
        login,
        logout
    }
}
