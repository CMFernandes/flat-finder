import { Card, CardContent, CardMedia, Typography, IconButton, Box} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import dayjs from 'dayjs';
import { FlatData } from "../types/flatData";
import useFlats from "../hooks/useFlats";
import { Link } from "react-router-dom";

type FlatCardProps =  {
  flat: FlatData
}

export default function FlatCard({flat}: FlatCardProps) {
  const {favouriteFlatsIds, toggleFavourite} = useFlats()

  const isFavorite = favouriteFlatsIds.includes(flat.id);

  
  return (
    <Card sx={{ width: 300, borderRadius: 2, boxShadow: 3 }}>
      <Link to={`/flat/${flat.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia
          component="img"
          height="200"
          image={flat.imgUrl}
          alt="flat image"
        />

        <CardContent sx={{ display: "flex", justifyContent: "space-between", }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {flat.city}
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              ${flat.rentPrice} / month
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              {flat.areaSize} m²
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              Available from {dayjs(flat.dateAvailable).format('DD MMM')}
            </Typography>
          </Box>

          <Box display="flex" alignSelf="flex-end" >
            <IconButton
              color={isFavorite ? "error" : "default"}
              onClick={(event) => {
                event.preventDefault();
                toggleFavourite(flat.id);
              }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

