import { TextField, MenuItem, Box, Button, Collapse, InputAdornment } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from "react";

type FilterSortPanel = {
    filters: {
        city: string, 
        minPrice: string, 
        maxPrice: string, 
        minSize: string, 
        maxSize: string 
    },
    setFilters: React.Dispatch<React.SetStateAction<FilterSortPanel['filters']>>;
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterSortPanel({filters, setFilters, sortBy, setSortBy }: FilterSortPanel) {
    const [open, setOpen] = useState(true);
    
    const handleReset = () => {
        setFilters({ city: "", minPrice: "", maxPrice: "", minSize: "", maxSize: "" });
        setSortBy("");
    };

    return (
        <Box sx={{ padding: 3, maxWidth: 1400, margin: "auto" }}>
            <Button 
                variant="contained" 
                onClick={() => setOpen(!open)} 
                sx={{ mb: 2, marginLeft:"auto" ,display: "flex"}}
               
            >
                <TuneIcon /> 
            </Button>
            
            <Collapse in={open}>
                <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    <TextField
                        label="City"
                        value={filters.city}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Min Price"
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Max Price"
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        fullWidth
                    />
                </Box>

                <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    <TextField
                        label="Min Area Size"
                        type="number"
                        value={filters.minSize}
                        onChange={(e) => setFilters({ ...filters, minSize: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Max Area Size"
                        type="number"
                        value={filters.maxSize}
                        onChange={(e) => setFilters({ ...filters, maxSize: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        select
                        label="Sort By"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SortIcon />
                              </InputAdornment>
                            ),
                          }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="city">City</MenuItem>
                        <MenuItem value="price descendent">Price: from higher to lower</MenuItem>
                        <MenuItem value="price ascendent">Price: from lower to higher</MenuItem>
                        <MenuItem value="size descendent">Area Size: from higher to lower  </MenuItem>
                        <MenuItem value="size ascendent">Area Size: from lower to higher</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                    <Button variant="outlined" color="primary" onClick={handleReset}>
                        Reset Filters
                    </Button>
                </Box>
            </Collapse>
        </Box>
    );
}
