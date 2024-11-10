import { AppBar, Box, Button, FormControl, IconButton, Input, Menu, MenuItem, Toolbar, Typography, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { teal } from '@mui/material/colors';
import React from 'react';
import { searchTermProps } from '../types.tsx';
import { Link } from 'react-router-dom';

export default function Navbar({ searchTerm, setSearchTerm, cartItems=[] }: searchTermProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchTerm(value);
    }

    function submitSearch(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: teal[500],
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        alignItems: 'center',
                    }}
                >
                    {/* Brand name */}
                    <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'bold',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Espresso Emporium
                        </Typography>
                    </Link>

                    {/* Right side content: search bar and login button */}
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        {/* Search Bar */}
                        <form onSubmit={submitSearch} style={{ display: 'flex', alignItems: 'center' }}>
                            <FormControl>
                                <Input
                                    id="searchTerm"
                                    placeholder="Search"
                                    sx={{
                                        color: 'white',
                                        width: 200,
                                        '& .MuiInput-input': {
                                            padding: '6px 10px', // better padding for the input field
                                        },
                                    }}
                                    value={searchTerm}
                                    onChange={handleSearchTerm}
                                    disableUnderline
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </FormControl>
                            <IconButton type="submit" color="inherit" sx={{ ml: 1 }}>
                                <SearchIcon />
                            </IconButton>
                        </form>

                        {/* Login Button */}
                        <Button
                            color="inherit"
                            sx={{
                                borderRadius: 2,
                                ml: 2, // Adds space between the search bar and login button
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </Box>

                    {/* Cart Icon */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-label="cart"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        id="cart"
                        sx={{ ml: 2 }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>

                    {/* Cart Menu */}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {cartItems?.length !== 0 ? (
                            cartItems.map((cart) => (
                                <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={cart.img} style={{ width: '40px', height: '40px', marginRight: '8px' }} />
                                    <div>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            {cart.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {cart.quantity} | ${cart.price *cart.quantity}
                                        </Typography>
                                    </div>
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>Your cart is empty</MenuItem>
                        )}
                        {cartItems?.length > 0 && <Divider sx={{ my: 1 }} />}
                        {cartItems?.length > 0 && (
                            <MenuItem onClick={handleClose} sx={{ justifyContent: 'center' }}>
                                <Link to={'/checkout'}>
                                    <Button color="primary" variant="outlined" size="small">
                                        Check out
                                    </Button>
                                </Link>
                            </MenuItem>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
