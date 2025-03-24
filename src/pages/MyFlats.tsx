
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import useFlats from '../hooks/useFlats';
import FlatCardList from '../components/FlatCardList';
import Title from '../components/Title';


export default function MyFlats() {
    const navigate = useNavigate();
    const {currentUser} = useAuthContext();
    const {flats} = useFlats();

    const userFlats = flats.filter((flat) => flat.flatOwnerId === currentUser?.id)

    return (
        <Box >
            <Title title="My Flats"/>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 , mt: 2,}}>
                <Button variant="contained" size="large" onClick={() => navigate("/flat-form")}>New flat</Button>
            </Box>
            <FlatCardList flats={userFlats}/>
        </Box> 
    )
}