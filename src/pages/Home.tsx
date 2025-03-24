import { useState } from "react";
import FlatCardList from "../components/FlatCardList";
import useFlats from "../hooks/useFlats";

import FilterSortPanel from "../components/FilterSortPanel";


export default function Home() {
    const {flats} = useFlats();

    const [filters, setFilters] = useState({
        city: "",
        minPrice: "",
        maxPrice: "",
        minSize: "",
        maxSize: "",
    });

    const [sortBy, setSortBy] = useState<string>("");

    const filteredFlats = flats.filter(flat => {
        const matchesCity = filters.city ? flat.city.toLowerCase().includes(filters.city.toLowerCase()): true
        const matchesPrice =
            (filters.minPrice ? flat.rentPrice >= Number(filters.minPrice) : true) &&
            (filters.maxPrice ? flat.rentPrice <= Number(filters.maxPrice) : true);
        const matchesSize =
            (filters.minSize ? flat.areaSize >= Number(filters.minSize) : true) &&
            (filters.maxSize ? flat.areaSize <= Number(filters.maxSize) : true);
        return matchesCity && matchesPrice && matchesSize;
    });


    const sortedFlats = [...filteredFlats].sort((a, b) => {
        if (sortBy === "city") return a.city.localeCompare(b.city);
        if (sortBy === "price ascendent") return a.rentPrice - b.rentPrice;
        if (sortBy === "price descendent") return b.rentPrice - a.rentPrice;
        if (sortBy === "size ascendent") return a.areaSize - b.areaSize;
        if (sortBy === "size descendent") return b.areaSize - a.areaSize;
        return 0;
    });
    
    return(
        <div>
            <FilterSortPanel filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy}/>
            <FlatCardList flats={sortedFlats}/>
        </div>
    )
};