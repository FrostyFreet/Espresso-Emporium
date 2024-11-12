import {Typography, TextField, Divider, Button, Card, CardContent, IconButton} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid2'
import {dataType, dataTypeProps, formTypes} from "../types.tsx";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form"
import axios from "axios";
import {useState} from "react";


export default function Checkout({cartItems,setCartItems}:dataTypeProps) {


    const {register, handleSubmit,formState: { errors },} = useForm<formTypes>()
    const [disabled,setDisabled]=useState<boolean>(false)
    const total=cartItems?.reduce((acc:number,curr:dataType)=> acc + curr.price * curr.quantity,0)

    const onSubmit = async (data:formTypes) => {
        const orderData = {
            ...data,           // The form data (e.g., billing info)
            cartItems: cartItems, // The items in the cart
            totalPrice:total
        };
        try {
            console.log("Order Data:", orderData);
            const response = await axios.post('http://localhost:3000/sendOrder', orderData);
            console.log('Order sent successfully:', response.data);

        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };
    const handleIncrement = (id:number) => {
        setCartItems?.((prevState)=>
            prevState.map((item)=>item.id===id &&item.quantity<item.stock?
                {...item,quantity:item.quantity+1}:
                item)
        )
        cartItems?.map((item)=>item.id===id &&item.quantity===item.stock && setDisabled(!disabled))
    };

    const handleDecrement = (id:number) => {
        setCartItems?.((prevState)=>prevState.map((item)=>item.id===id && item.quantity>=1?{...item,quantity:item.quantity-1} : item )
            .filter((item)=>item.quantity>0))
        if(disabled){
            setDisabled(false)
        }
    };



    return (
        <>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4} padding={4}>
                <Grid size={{xs:12}}>
                    <Typography variant="h4" gutterBottom>
                        <ShoppingCartIcon /> Checkout
                    </Typography>
                </Grid>

                {/* Billing Information */}
                <Grid size={{xs:12, md:6}} >
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Billing Information</Typography>
                            <Divider sx={{ my: 2 }} />

                            <TextField fullWidth label="Full Name" variant="outlined" margin="normal"{...register("FullName", { required: "Full name is required" })} />
                            {errors.FullName && <span style={{ color: "red" }}>{errors.FullName.message}</span>}

                            <TextField fullWidth label="Email Address" variant="outlined" margin="normal" type="email" {...register("EmailAddress", {required: "Email is required",
                                pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address"}})} />
                            {errors.EmailAddress && <span style={{ color: "red" }}>{errors.EmailAddress.message}</span>}

                            <TextField fullWidth label="Phone Number" variant="outlined" margin="normal" type="tel" placeholder={'+36205556677'} {...register("PhoneNumber", {required: "Phone number is required", pattern: {value: /^\+?[1-9]\d{1,14}$/, message: "Invalid phone number"}})} />
                            {errors.PhoneNumber && <span style={{ color: "red" }}>{errors.PhoneNumber.message}</span>}

                            <TextField fullWidth label="Address" variant="outlined" margin="normal"{...register("Address", { required: "Address is required" })} />
                            {errors.Address && <span style={{ color: "red" }}>{errors.Address.message}</span>}

                            <TextField fullWidth label="City" variant="outlined" margin="normal"{...register("City", { required: "City is required" })} />
                            {errors.City && <span style={{ color: "red" }}>{errors.City.message}</span>}

                            <TextField fullWidth label="Zip Code" variant="outlined" margin="normal" type="number" {...register("ZipCode", {required: "Zip code is required", minLength: {value: 5, message: "Zip code must be at least 5 digits"}, maxLength: {value: 5, message: "Zip code cannot be more than 5 digits"}})} />
                            {errors.ZipCode && <span style={{ color: "red" }}>{errors.ZipCode.message}</span>}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Payment Information */}
                <Grid size={{xs:12, md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Payment Information</Typography>
                            <Divider sx={{ my: 2 }} />

                            <TextField fullWidth label="Card Number" variant="outlined" margin="normal"{...register("CardNumber", {required: "Card Number is required", minLength: { value: 16, message: "Card number must be 16 digits" }, maxLength: { value: 16, message: "Card number must be 16 digits" }})} />
                            {errors.CardNumber && <span style={{ color: "red" }}>{errors.CardNumber.message}</span>}

                            <TextField fullWidth label="Cardholder Name" variant="outlined" margin="normal"{...register("CardholderName", {required: "Cardholder Name is required", maxLength: { value: 20, message: "Cannot be longer than 20 characters" }})} />
                            {errors.CardholderName && <span style={{ color: "red" }}>{errors.CardholderName.message}</span>}

                            <TextField fullWidth label="Expiration Date" variant="outlined" margin="normal" type="date" {...register("ExpirationDate", {required: "Expiration date is required", validate: value => new Date(value).getTime() > Date.now() || "Expiration date must be in the future"})} InputLabelProps={{shrink: true,}}/>
                            {errors.ExpirationDate && <span style={{ color: "red" }}>{errors.ExpirationDate.message}</span>}

                            <TextField fullWidth label="CVV" variant="outlined" margin="normal"{...register("CVV", { required: "CVV is required" })} />
                            {errors.CVV && <span style={{ color: "red" }}>{errors.CVV.message}</span>}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Order Summary */}
                <Grid size={{xs:12, md:6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" >Order Summary</Typography>
                            <Divider sx={{mb:2,mt:2}}/>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{xs:3}}>
                                    <Typography variant="subtitle2" fontWeight="bold">Image</Typography>
                                </Grid>
                                <Grid size={{xs:3}}>
                                    <Typography variant="subtitle2" fontWeight="bold">Name</Typography>
                                </Grid>
                                <Grid size={{xs:3}}>
                                    <Typography variant="subtitle2" fontWeight="bold">Price</Typography>
                                </Grid>
                                <Grid size={{xs:3}}>
                                    <Typography variant="subtitle2" fontWeight="bold">Quantity</Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />
                            {/* Add order items and total calculation here */}

                            {cartItems?.map((cart)=>(

                                <Grid container spacing={2} key={cart.id} alignItems="center" sx={{ mb: 1 }}>

                                    <Grid size={{xs:3}}>
                                        <img src={cart.img} alt={cart.name} style={{ width: '60px', height: '60px' }} />
                                    </Grid>
                                    <Grid size={{xs:3}}>
                                        <Typography variant="body1">{cart.name}</Typography>
                                    </Grid>
                                    <Grid size={{xs:3}}>
                                        <Typography variant="body1">${(cart.price * cart.quantity).toFixed(2)}</Typography>
                                    </Grid>

                                    <Grid size={{xs:3}} container alignItems="center" >
                                        <Grid>
                                            <IconButton onClick={()=>handleDecrement(cart.id)}>
                                                <RemoveIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid>
                                            <Typography variant="body1" >{cart.quantity}</Typography>
                                        </Grid>
                                        {cart.quantity === cart.stock && (
                                            <Typography variant="body2" color="error" sx={{ mt: 5 }}>
                                                No more in stock
                                            </Typography>
                                        )}
                                        <Grid>
                                            <IconButton onClick={()=>handleIncrement(cart.id)} disabled={disabled} >
                                                <AddIcon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            ))}
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Total price:${total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Place Order Button */}
                <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        sx={{
                            padding: '12px 24px', // Larger padding for a more substantial button
                            borderRadius: '8px', // Rounded corners
                            fontWeight: 'bold', // Bold text for emphasis
                            boxShadow: 3, // Add a subtle shadow for depth
                            '&:hover': {
                                backgroundColor: 'primary.dark', // Darker shade on hover
                                boxShadow: 6, // More prominent shadow on hover
                            },
                            transition: 'all 0.3s ease', // Smooth transition for hover effects
                        }}
                    >
                        Place Order
                    </Button>
                </Grid>
            </Grid>
        </form>

        </>
    );
}
