import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ForgotPasswordPage() {
    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>Forgot Password</Typography>
            <TextField label="Email" fullWidth margin="normal" />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Send Reset Link</Button>
            <Box mt={2}>
                <Link component={RouterLink} to="/" underline="hover">Back to Login</Link>
            </Box>
        </Box>
    );
}
