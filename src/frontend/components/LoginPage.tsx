import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function LoginPAge() {
    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
            <Box mt={2}>
                <Link component={RouterLink} to="/ForgotPassword" underline="hover">
                    Forgot password?
                </Link>
            </Box>
            <Box mt={1}>
                <Typography variant="body2">
                    Don’t have an account? <Link component={RouterLink} to="/RegisterPage" underline="hover">Sign Up</Link>
                </Typography>
            </Box>
        </Box>
    );
}
