import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './cart.css';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(cartItems);
  const itemNames = () => cartItems ? Object.keys(cartItems) : [];
  console.log(itemNames());

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
              <CartItem cartItems={cartItems} setCartItems={setCartItems} itemName={name} item={cartItems[name]} />
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

// export class Cart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cartItems: this.props.location,
//     };
//   }

//   handleClick(){
//     console.log("Cart:", this.state.cartItems);
//     console.log("Cart2:", this.props.location.state);
//   }

//   render() {

//   }
// }

const containerStyle = {
  backgroundColor: '#FAFAFA',
  marginTop: '20px',
  paddingTop: '20px',
  borderRadius: '10px',
  borderStyle: 'grooved',
  borderStyle: 'solid',
};

export default Cart;
