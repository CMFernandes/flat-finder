import { Box, Divider, Typography } from "@mui/material";


export default function Title({title}: {title : string} ){
    return (
        <Box sx={{ 
            padding: 2,
            maxWidth:"lg", 
            margin: '0 auto',
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            justifyContent: "center", }} 
        >
            <Typography variant="h4" gutterBottom color="text.primary" fontFamily= 'verdana' fontWeight= "500" letterSpacing= '.1rem' align= "left">
                {title}
            </Typography>
            <Divider sx={{ marginBottom: 2, width: "80%" }} />
        </Box>
    )
}