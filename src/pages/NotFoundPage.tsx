import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography variant="h4" gutterBottom >
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                The page you're looking for does not exist or was moved.
            </Typography>
            <Button variant="contained" onClick={()=> navigate("/")}>
                Home
            </Button>
        </Box>
    )
}