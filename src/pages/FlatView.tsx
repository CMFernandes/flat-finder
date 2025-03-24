import { useNavigate, useParams } from "react-router-dom"
import { FlatData } from "../types/flatData";
import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { Box, Button, Card, CardContent, CircularProgress, Divider,Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import useAuthContext from "../hooks/useAuthContext";

import EditFlat from "./EditFlat";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import { UserData } from "../types/userData";
import useFlats from "../hooks/useFlats";

export default function FlatView(){
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const {flatId} = useParams();
  
    const[flat, setFlat] = useState<FlatData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const {queryById} = useFirestore("Flats");
    const {currentUser} = useAuthContext();

    const {getAllUsers} = useFirestore("users");
    const [users, setUsers] = useState<UserData[]>([]);


    const {deleteFlat} = useFlats();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlat = async() => {
            if(!flatId) return

            try {
                const fetchedFlat = await queryById<FlatData>(flatId);
                if (fetchedFlat) {
                    setFlat(
                        { 
                            ...fetchedFlat, 
                            id: flatId, 
                            dateAvailable: dayjs(fetchedFlat.dateAvailable.toDate())
                        });
                } else {
                    console.error(`Flat with ID ${flatId} not found.`);
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchFlat()
    },[flatId])

    useEffect(() => {
        async function fetchUsers() {
            const usersData = await getAllUsers();

            setUsers(usersData)
        }
        fetchUsers()
    }, [])

    const flatOwner = users.find(user => user.id === flat?.flatOwnerId) ;
  
    if (loading) {
        return <CircularProgress color="primary" /> 
    }

    async function handleDeleteFlat() {
      const isConfirmed = window.confirm("Are you sure you want to delete this flat? This action cannot be undone.");
      if (!isConfirmed) return;

      if(!flatId){
        return
      }
      await deleteFlat(flatId)
      navigate(-1);
    }

    if(!flat || !flatId){
      return
    }
    return (
        <>
        {!isEditing ? (
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 3, marginRight: 3}}>
        <Card sx={{ width: "100%", maxWidth: "1200px", boxShadow: 3, borderRadius: 2, p: 3 ,}}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
            
            <Box sx={{ flex: 1, textAlign: "center", overflow: "hidden", borderRadius: "8px" }}>
              <img
                src={flat?.imgUrl}
                alt="Flat"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", 
                  borderRadius: "8px",
                }}
              />
            </Box>
      
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                  {flat?.city}, {flat?.streetName} {flat?.streetNumber}
                </Typography>
                <Divider sx={{ my: 2 }} />
      
                <Box sx={{ display: "flex", gap: 4 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">
                      <strong>Area Size:</strong> {flat?.areaSize} m²
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Year Built:</strong> {flat?.yearBuilt}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">
                      <strong>Rent Price:</strong> ${flat?.rentPrice} / month
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Available from:</strong> {dayjs(flat?.dateAvailable).format("DD/MM/YYYY")}
                    </Typography>
                  </Box>
                </Box>
      
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Air Conditioning:</strong> {flat?.hasAC ? "Yes" : "No"}
                </Typography>
      
                {currentUser && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      <strong>Contacts:</strong> {`${flatOwner?.firstName} ${flatOwner?.lastName} ${flatOwner?.email}`}
                    </Typography>
                  </>
                )}
      
                {currentUser?.id === flat?.flatOwnerId && (
                  <Box sx={{ mt: 3, textAlign: "center" , display:"flex", justifyContent: "space-around"}}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => setIsEditing(true)}
                      sx={{width: "40%" , py: 1 }}
                    >
                      Edit Flat
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteFlat}
                      sx={{width: "20%" , py: 1 }}
                      >
                      
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Box>
          </Box>
        </Card>
      
        <Box sx={{ mt: 4, width: "100%", maxWidth: "1200px", marginLeft: 3, marginRight: 3}}>
          <MessageList flat={flat} />
        </Box>
      
        {/* Message Form Section */}
        {currentUser?.id !== flat?.flatOwnerId && (
          <MessageForm flatId={flatId} flatOwnerId={flat?.flatOwnerId} />
        )}
      </Box>
        ) : (
            <EditFlat flat={flat} setIsEditing={setIsEditing} setFlat={setFlat} />
        )}
        </>
    )
}