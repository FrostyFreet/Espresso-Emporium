import { Box, Container,Typography, IconButton} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import Grid from '@mui/material/Grid2';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: teal[500], color: "white", py: 3, mt: 3, height:"150px", width:'100%', bottom:0,left:0,position:'relative' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    {/* About Section */}
                    <Grid size={{xs:12, sm:4}}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            Espresso Emporium is dedicated to delivering the finest coffee experiences.
                            From beans to brews, we have something for every coffee lover.
                        </Typography>
                    </Grid>

                    {/* Contact Section */}
                    <Grid size={{xs:12, sm:4}}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">
                            Email: contact@espressoemporium.com
                        </Typography>
                        <Typography variant="body2">
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>

                    {/* Social Media Section */}
                    <Grid size={{xs:12, sm:4}}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box>
                            <IconButton color="inherit" href="https://facebook.com" aria-label="Facebook">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit" href="https://twitter.com" aria-label="Twitter">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit" href="https://instagram.com" aria-label="Instagram">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit" href="https://linkedin.com" aria-label="LinkedIn">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                {/* Copyright Section */}
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="inherit">
                        &copy; {new Date().getFullYear()} Espresso Emporium. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
