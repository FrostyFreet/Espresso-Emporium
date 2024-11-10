
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dataTypeProps} from "../types.tsx";
import {CardMedia} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {grey} from "@mui/material/colors";




export default function CardComponent({data}:dataTypeProps){

    return(
        <Box sx={{ flexGrow: 1, mt: 2, px: 3 }}>
            <Grid container spacing={3} justifyContent="center">
                {data.map((item) => (
                    <Grid size={{xs:12, sm:6, md:4, lg:3}} key={item._id}>  {/* Responsive layout */}
                        <Card
                            variant="outlined"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                                boxShadow: 3,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.02)' }
                            }}
                        >
                            <CardMedia
                                sx={{ height: 180, backgroundSize: 'cover' }}
                                image={item.img}
                                title={item.name}
                            />
                            <CardContent sx={{ flexGrow: 1, bgcolor: grey[100], p: 2 }}>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                    {item.name}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                                    {item.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {item.description}
                                </Typography>
                                <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                                    ${item.price}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Stock: {item.stock}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                <Button variant="contained" size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}