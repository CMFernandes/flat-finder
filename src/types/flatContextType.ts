import { FlatData } from "./flatData"

export type FlatContextType = {
    flats: FlatData[],
    favouriteFlatsIds: string[],
    addFlat: (data: FlatData) => Promise<void>
    deleteFlat: (id: string) => Promise<void>
    updateFlat: ( id: string, data: FlatData) => Promise<void>
    toggleFavourite: (flatId: string) => void;
}