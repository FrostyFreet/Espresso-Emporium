import {dataType, dataTypeProps} from "../types.tsx";
import { Card, CardMedia, CardContent, Typography, CardActions, Button,  Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { grey } from "@mui/material/colors";
import Grid from '@mui/material/Grid2'

export default function ItemDetailPage({setCartItems}:dataTypeProps) {
    const [itemData, setItemData] = useState<dataType | null>(null);
    const { id } = useParams();
    const [disabled,setDisabled]=useState<boolean>(false)
    useEffect(() => {
        if(itemData?.stock===0){setDisabled(true)}
        else {setDisabled(false);}
    }, [itemData?.stock]);
    useEffect(() => {
        if (id) {
            console.log("Fetching item with ID:", id);
            axios
                .get(`http://localhost:3000/${id}`)
                .then((response) => {
                    setItemData(response.data.rows[0])
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    if (!itemData) {
        return <div>Loading...</div>;
    }

    function addToCart(itemData: dataType) {
        setCartItems?.((prevState) => {
            const existingItemIndex = prevState.findIndex(item => item.id === itemData.id);
            if (existingItemIndex !== -1) {
                // If the item already exists, increase its quantity
                const updatedCart = [...prevState];
                if(updatedCart[existingItemIndex].quantity<itemData.stock){
                    updatedCart[existingItemIndex].quantity += 1;
                }
                else{
                    setDisabled(!disabled)
                }
                return updatedCart;
            } else {
                // If it's a new item, add it with quantity 1
                return [...prevState, { ...itemData, quantity: 1 }];
            }
        });
    }

    return (
        <Box sx={{ padding: 4 }} >
            <Grid container spacing={4} justifyContent="center">
                <Grid size={{xs:12,sm:8, md:6, lg:4 }}>
                    <Card
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: 'hidden',

                        }}
                        key={itemData.id}
                    >
                        <CardMedia
                            sx={{
                                height: 300,
                                backgroundSize: 'cover',
                                objectFit: 'contain',
                                backgroundColor: grey[100],
                            }}
                            image={itemData.img}
                            title={itemData.name}
                        />
                        <CardContent sx={{ padding: 3, bgColor: grey[50] }}>
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {itemData.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {itemData.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {itemData.description}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                                ${itemData.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Stock: {itemData.stock}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-start', paddingX: 3, paddingBottom: 3 }}>
                            <Button variant="contained" size="small" color="primary" onClick={()=>addToCart(itemData)} disabled={disabled}>
                               {disabled?<p>Out of Stock</p>:<p>Add to Cart</p>}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
