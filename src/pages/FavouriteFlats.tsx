import { Box, Button,Typography } from "@mui/material";
import FlatCardList from "../components/FlatCardList";

import useFlats from "../hooks/useFlats";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";


export default function FavouriteFlats(){
    const navigate = useNavigate();
    const {favouriteFlatsIds, flats} = useFlats();

    const favouriteFlats = flats.filter(flat => favouriteFlatsIds.includes(flat.id));
    
    return (
        <>
            <Title title="Favourite Flats"/>
            {favouriteFlats.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        mt: 5,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        You have no favourite flats yet!
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => navigate("/")}>
                        Browse Flats
                    </Button>
                </Box>
                ) : (
                    <FlatCardList flats={favouriteFlats} />
                )}
        </>
    );
}