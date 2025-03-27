import {
    getDocs,
    getDoc, 
    doc, 
    setDoc, 
    deleteDoc,
    updateDoc, 
    collection,
    addDoc,
    query,
    where,
} from "firebase/firestore"

import { firestoreDB } from "../config/firebase"
import { UserFirestoreData } from "./useAuth"
import { FlatData } from "../types/flatData"
import { MessageData } from "../types/messageData"
import { UserData } from "../types/userData"


type FlatFirestoreData = Omit<FlatData, "dateAvailable"> & {
    dateAvailable: Date;
}

export default function useFirestore(collectionName: string){

    const collectionRef = collection(firestoreDB, collectionName)


    async function addUserDocument(docId: string, data: UserFirestoreData): Promise<void> {
        try {
            await setDoc(doc(firestoreDB, collectionName, docId), data)
            
        } catch(error){
            if (error instanceof Error) {
                console.error("Error adding user to firebase", error.message); 
            } else {
                console.error("An unknown error occurred");
            }
        };
    };

    async function removeUser(userId: string) {
        const userRef = doc(firestoreDB, collectionName, userId);
        await deleteDoc(userRef);
    };

    async function getAllUsers() {
        try {
            const querySnapshot = await getDocs(collectionRef);

            return querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })) as UserData[]
        } catch (error) {
            console.error("Error fetching documents from Firestore:", error);
            return [];
        }
    };

    async function addFlatDocument(data: FlatData): Promise<FlatData>{
        try {
           
            const newFlat: FlatFirestoreData = {
                ...data,
                dateAvailable: data.dateAvailable.toDate()
            }
            const docRef = await addDoc(collectionRef, newFlat)
           
           return { ...data, id: docRef.id};
        } catch (error) {
            if(error instanceof Error){
                console.error("error adding flat to firebase", error.message)
                throw error
            }else {
                console.error("An unknown error ocurred");
                throw new Error("Unknown error occurred during addFlatDocument");
            }
           
        };
    };

   
    async function getFavouriteFlats(userId: string): Promise<string[]> {
        try {
          const userRef = doc(firestoreDB, "users", userId);
          const userSnap = await getDoc(userRef);
          console.log(userSnap.data(), "getFavourite");
          if (userSnap.exists()) {
            return userSnap.data().favouriteFlats || [];
          } else {
            return []; 
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
          return [];
        }
    }

    async function updateFavouriteFlats(userId: string, updatedFavourites: string[]): Promise<void> {
        try {
            const userRef = doc(firestoreDB, "users", userId);
            await updateDoc(userRef, {
              favouriteFlats: updatedFavourites, 
            });
          } catch (error) {
            console.error("Error updating favorite flats:", error);
          }
    }
    
    async function removeDocument(
        docId: string
    ): Promise<void> {
        try {
            const docRef = doc(firestoreDB, collectionName, docId)
            await deleteDoc(docRef)
        } catch(error){
            if (error instanceof Error) {
                console.error("error removing doc from firebase", error.message) 
            } else {
                console.error("An unknown error occurred");
            }
        };
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function updateDocument<T extends Record<string, any>>(
        docID: string,
        data: T
    ): Promise<void> {
        try {
            const docRef = doc(firestoreDB,collectionName, docID );

            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                throw new Error(`No document found in ${collectionName} with ID: ${docID}`);
            }
            await updateDoc(docRef, data)
        } catch (error) {
            if (error instanceof Error) {
                console.error("error updating data", error.message)
            } else {
                console.error("An unknown error occurred");
            }
            
        }
    }
    
    async function queryById<T>( id: string): Promise<T | null> {
        try {
            const docRef = doc(firestoreDB, collectionName, id);

            const docSnapshot = await getDoc(docRef)

            if (!docSnapshot.exists()) {
                console.warn(`No document found in ${collectionName} with uid: ${id}`);
                return null
            }

            return docSnapshot.data() as T;
        } catch (error) {
            console.error("fail to search user ", error)
            return null
        }
    }

    async function addMessage(message: MessageData) {
        try {
            const messagesRef = collection(firestoreDB, collectionName);
            await addDoc(messagesRef, message);
        } catch (error) {
            console.error("Error adding message to Firestore:", error);
        }
    };

   
    async function getMessagesByFlatId(flatId: string){
       
        const q = query(collectionRef, where("flatId", "==", flatId));

        try {
            const querySnapshot = await getDocs(q);
           
            return querySnapshot.docs.map(doc => doc.data() as MessageData);
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    }
    return {
        addUserDocument,
        removeUser,
        getAllUsers,
        addFlatDocument,
        getFavouriteFlats,
        updateFavouriteFlats,
        removeDocument,
        updateDocument,
        queryById,
        addMessage,
        getMessagesByFlatId
        
    }
};

