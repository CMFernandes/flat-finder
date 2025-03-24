import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore"
import { UserData } from "../types/userData";
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFlats from "../hooks/useFlats";
import Title from "../components/Title";


export default function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserData[]>([])
    const {getAllUsers, updateDocument, removeDocument} = useFirestore("users");

    const {flats, deleteFlat} = useFlats();

    useEffect(() => {
        async function fetchUsers() {
            const usersData = await getAllUsers();

            setUsers(usersData)
        }
        fetchUsers()
    }, [])

    const handleGrantAdmin = async (userId: string) => {
        await updateDocument(userId, {role: "admin"} );
        setUsers(users.map(user => user.id === userId ? { ...user, role: "admin" } : user));
    };
    
    const handleRemoveUser = async (userId: string) => {
        try {
            const userFlats = flats.filter(flat=> flat.flatOwnerId === userId)

            for(const flat of userFlats){
                await deleteFlat(flat.id)
            }

            await removeDocument(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("error during handleRemoveUser", error)
        }
    };

    const countFlats = (userId: string) => {
        return flats.filter(flat => flat.flatOwnerId === userId).length;
    };
    
    return (
        <>
            <Title title="Admin Dashboard"/>
            <Box sx={{ width: "100%", mt: 4 }}>
            <TableContainer component={Paper} sx={{ maxWidth: "1400px", margin: "auto", mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Full Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Published Flats</strong></TableCell>
                            <TableCell><strong>Is Admin</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{countFlats(user.id)}</TableCell>
                                    <TableCell>{user.role === "admin" ? "Yes" : "No"}</TableCell>
                                    <TableCell>
                                        <Stack 
                                            direction={{ xs: "column", md: "row" }} 
                                            spacing={1} 
                                            alignItems={{ xs: "stretch", md: "center" }}
                                        >
                                            <Button 
                                                variant="contained" 
                                                color="primary"
                                                onClick={() => navigate(`/profile/${user.id}`)}
                                            >
                                                View Profile
                                            </Button>
                                            {user.role !== "admin" && (
                                                <Button 
                                                    variant="outlined" 
                                                    color="success" 
                                                    sx={{ ml: 1}}
                                                    onClick={() => handleGrantAdmin(user.id)}
                                                >
                                                    Grant Admin
                                                </Button>
                                            )}
                                    
                                            <Button 
                                             variant="outlined" 
                                                color="error"  
                                                sx={{ ml: 1 }}
                                                onClick={() => handleRemoveUser(user.id)}
                                            >
                                                Remove User
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}