import { Box, Button, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";

export default function Unauthorized(){
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h4" gutterBottom >
                Access denied
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                You don't have permission to access this page.
            </Typography>
            <Button variant="contained" onClick={()=> navigate("/")}>
                Home
            </Button>
        </Box>
    )
}