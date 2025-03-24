import { PropsWithChildren, useEffect, useState } from "react";
import { FlatsContext } from "./FlatsContext";
import { FlatData } from "../../types/flatData";
import useFirestore from "../../hooks/useFirestore";
import useAuthContext from "../../hooks/useAuthContext";
import dayjs from "dayjs";


export const FlatsContextProvider = ({children }: PropsWithChildren) => {
    const [flats, setFlats] = useState<FlatData[]>([]);
    const { addFlatDocument, removeDocument, updateDocument, queryAllFlats,getFavouriteFlats, updateFavouriteFlats} = useFirestore("Flats")
    const { currentUser } = useAuthContext();
    const [favouriteFlatsIds, setFavouriteFlatsIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchFlats = async () => {
            const fetchedFlats = await queryAllFlats<FlatData>();
            const flatsWithId = fetchedFlats.map((flat) => ({
                ...flat,
                id: flat.id,  
                dateAvailable: dayjs(flat.dateAvailable.toDate())
            }));
            
            setFlats(flatsWithId);
        };
        fetchFlats();
    }, []);


    const addFlat = async ( data: FlatData) => {

        const flatWithId = await addFlatDocument(data);
        setFlats((prevFlats) => [...prevFlats, flatWithId]);
    }

    const deleteFlat = async (id: string) => {
        await removeDocument(id)
        setFlats((prevFlats) => prevFlats.filter(flat => flat.id !== id ))
    }
    
    const updateFlat = async (id: string, data: FlatData) => {
        await updateDocument(id,{...data, dateAvailable: data.dateAvailable.toDate()})
        setFlats((prevFlats) => prevFlats.map(flat => flat.id === id ? {...flat, ...data} : flat));
    }

    useEffect(() => {
        if (!currentUser) return;

        async function fetchFavourites() {
            if(currentUser){
                const favoriteFlatsIds = await getFavouriteFlats(currentUser.id);
                setFavouriteFlatsIds(favoriteFlatsIds );
            }
        }

        fetchFavourites();
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

            setFavouriteFlatsIds(updatedFavorites);
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


