import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Typography,
  IconButton,
  Container,
  Box,
  Toolbar,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import CartItem from '../components/CartItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './cart.css';

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "CAD",

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Cart = ({ cartItems, setCartItems }) => {
  
  const itemNames = () => cartItems ? Object.keys(cartItems) : [];
  const [quantities, setQuantities] = useState([]);

  const sumDue = () => {
    let prices = [];
    prices = itemNames().map((name) => {
      const currItem = cartItems[name];
      return currItem.quantity * currItem.price;
    });
    return prices.reduce((a, b) => a + b, 0);
  }

  const navigate = useNavigate();
  const [totalDue, setTotalDue] = useState(0);

  useEffect(() => {
    const sumVal = sumDue();
    setTotalDue(sumVal);
  }, [cartItems, quantities]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
								navigate("/Menu");
							}}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                padding: '5px',
                fontWeight: 600,
              }}
            >
              Shopping Cart
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ padding: '20px' }}>
          <h3>Cart Summary:</h3>
          <div className="container" style={containerStyle}>
            {itemNames().map((name) => (
              <CartItem cartItems={cartItems} setCartItems={setCartItems} itemName={name} item={cartItems[name]} quantities={quantities} setQuantities={setQuantities} />
            ))}
          </div>
        </Container>
      </Box>
      <Container sx={{ padding: '20px' }}>
        <div className="requirements">
          <h3>Requirements:</h3>
          <TextField
            id="outlined-textarea"
            label=""
            placeholder="Type here to send a special note to the chefs..."
            rows={2}
            multiline
            fullWidth
          />
        </div>
      </Container>
      <Container sx={{ padding: '20px' }}>
        <div className="payment">
          <h3>Amount Due:</h3>
          <h5>{formatter.format(totalDue)}</h5>
          <Button
            onClick={() => {
              this.handleClick();
            }}
          >
            Submit & Pay Now
          </Button>
          <Button>Cancel</Button>
        </div>
      </Container>
    </div>
  );
};

const containerStyle = {
  backgroundColor: '#FAFAFA',
  marginTop: '20px',
  paddingTop: '20px',
  borderRadius: '10px',
  borderStyle: 'solid',
};

export default Cart;
