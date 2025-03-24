import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { UserData } from "../types/userData";

export default function ProfileDetails({ user, setIsEditing }: { user: UserData | null; setIsEditing: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Box
            sx={{
                padding: 3,
                maxWidth: 500,
                margin: "2rem auto",
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Box sx={{ padding: 2, maxWidth: 500, margin: "0 auto" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    color="text.primary"
                    fontFamily="verdana"
                    fontWeight="500"
                    letterSpacing=".1rem"
                    align="left"
                >
                    Profile
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
            </Box>

            <Stack spacing={2}>
                <Card sx={{ display: "flex", alignItems: "center", boxShadow: 2, maxHeight: 80 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            First Name
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1, color: "text.secondary" }}>
                            {user?.firstName}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ display: "flex", alignItems: "center", boxShadow: 2, maxHeight: 80 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Last Name
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1, color: "text.secondary" }}>
                            {user?.lastName}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ display: "flex", alignItems: "center", boxShadow: 2, maxHeight: 80 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Email
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1, color: "text.secondary" }}>
                            {user?.email}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ display: "flex", alignItems: "center", boxShadow: 2, maxHeight: 80 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            Birth Date
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1, color: "text.secondary" }}>
                            {user?.birthDate.format("DD/MM/YYYY")}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setIsEditing(true)}
                sx={{ marginTop: 2 }}
            >
                Edit Profile
            </Button>
        </Box>
    );
}