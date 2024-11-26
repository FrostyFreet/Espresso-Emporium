import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <Typography>You need to log in to view this page.</Typography>;
    }


    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <Box
                sx={{
                    width: 240,
                    backgroundColor: '#fff',
                    borderRight: '1px solid #e0e0e0',
                    padding: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Profile Page
                </Typography>
            </Box>

            <Box sx={{ flex: 1, padding: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{xs:12,md:8}}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                General Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={{xs:12,sm:6}}>
                                    <TextField
                                        label="First Name"
                                        value={user?.name || ''}
                                        name="FirstName"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid size={{xs:12,sm:6}}>
                                    <TextField
                                        label="Last Name"
                                        value={user?.family_name || ''}
                                        name="FamilyName"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid size={{xs:12,sm:6}}>
                                    <TextField
                                        label="Email"
                                        name="Email"
                                        value={user?.email || ''}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>

                    <Grid size={{xs:12, md:4}}>
                        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                            <Avatar
                                src={user?.picture}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    margin: '0 auto',
                                    mb: 2,
                                }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {user?.nickname}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Consumer
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
