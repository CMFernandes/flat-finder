import { createContext } from "react";
import { FlatContextType } from "../../types/flatContextType";


export const FlatsContext = createContext<FlatContextType | undefined>(undefined);