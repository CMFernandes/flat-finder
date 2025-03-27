import { PropsWithChildren, useEffect, useState } from "react";
import { firestoreDB } from "../../config/firebase"
import { FlatsContext } from "./FlatsContext";
import { FlatData } from "../../types/flatData";
import useFirestore from "../../hooks/useFirestore";
import useAuthContext from "../../hooks/useAuthContext";
import dayjs from "dayjs";
import { collection, doc, onSnapshot } from "firebase/firestore";


export const FlatsContextProvider = ({children }: PropsWithChildren) => {
    const [flats, setFlats] = useState<FlatData[]>([]);
    const { addFlatDocument, removeDocument, updateDocument, updateFavouriteFlats} = useFirestore("Flats")
    const { currentUser } = useAuthContext();
    const [favouriteFlatsIds, setFavouriteFlatsIds] = useState<string[]>([]);

    useEffect(() => {
        const flatCollectionRef = collection(firestoreDB, "Flats");

        const unsubscribe = onSnapshot(flatCollectionRef, (snapshot) => {
            const updatedFlats: FlatData[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...(data as FlatData),
                    id: doc.id,  
                    dateAvailable: dayjs(data.dateAvailable.toDate()),
                }
            })
            setFlats(updatedFlats)
        })
        return () => unsubscribe();
       
    }, []);


    const addFlat = async ( data: FlatData) => {

        await addFlatDocument(data);
    };

    const deleteFlat = async (id: string) => {
        await removeDocument(id)
       
    }
    
    const updateFlat = async (id: string, data: FlatData) => {
        await updateDocument(id,{...data, dateAvailable: data.dateAvailable.toDate()})
    
    }

    useEffect(() => {
        if (!currentUser) return;

        const userFavRef = doc(firestoreDB, "users", currentUser.id);

        const unsubscribe = onSnapshot(userFavRef, (docSnapshot) => {
            if( docSnapshot.exists()){
                const favouriteFlatsIds = docSnapshot.data().favouriteFlats || [];
                setFavouriteFlatsIds(favouriteFlatsIds)
            }else{
                setFavouriteFlatsIds([])
            }
        })

        return () => unsubscribe()
       
    }, [currentUser]);
    
    const toggleFavourite = async (flatId: string) => {
        if (!currentUser) {
            console.log("User is not authenticated");
            return; 
        }

        const isFavourite = favouriteFlatsIds.includes(flatId);

        try {
            const updatedFavorites = isFavourite
                ? favouriteFlatsIds.filter((id) => id !== flatId) 
                : [...favouriteFlatsIds, flatId]; 

            await updateFavouriteFlats(currentUser.id, updatedFavorites);

        } catch (error) {
          console.error("Error toggling favorite:", error);
        }
      };

    return (
        <FlatsContext.Provider value={{ flats, addFlat, deleteFlat, updateFlat, favouriteFlatsIds, toggleFavourite}}>
            {children}
        </FlatsContext.Provider>
    );
}


