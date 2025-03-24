import { FlatData } from "../types/flatData";
import FlatCard from "./FlatCard";
import { Box, Grid } from "@mui/material";


type FlatCardListProps = {
  flats: FlatData[]; 
}
  
export default function FlatCardList({flats}:FlatCardListProps) {
   
  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' , paddingX: 2 }}>
    <Grid container spacing={2}  marginTop={2} justifyContent="center">
      {flats.map((flat) => (
        <Grid item display="flex" justifyContent="center" xs={12} sm={6} md={4} lg={3} key={flat.id} >
        <FlatCard
          flat={flat}
        /> 
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};

