import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function RegisterPage() {
    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <TextField label="Full Name" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />
            <TextField label="Confirm Password" type="password" fullWidth margin="normal" />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
            <Box mt={2}>
                <Typography variant="body2">
                    Already have an account? <Link component={RouterLink} to="/LoginPage" underline="hover">Login</Link>
                </Typography>
            </Box>
        </Box>
    );
}
