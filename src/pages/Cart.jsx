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
  Snackbar,
  Alert,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CartItem from '../components/CartItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './cart.css';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Cart = ({ cartItems, setCartItems }) => {
  const itemNames = () => (cartItems ? Object.keys(cartItems) : []);
  const [quantities, setQuantities] = useState([]);

  const sumDue = () => {
    let prices = [];
    prices = itemNames().map((name) => {
      const currItem = cartItems[name];
      return currItem.quantity * currItem.price;
    });
    return prices.reduce((a, b) => a + b, 0);
  };

  const navigate = useNavigate();
  const [totalDue, setTotalDue] = useState(0);

  useEffect(() => {
    const sumVal = sumDue();
    setTotalDue(sumVal);
  }, [cartItems, quantities]);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
    setOpen2(false);
  };

  const handleFeedback = () => {
    navigate('/Feedback');
  };

  const handleMenu = () => {
    navigate('/Menu');
  };

  const [showToast, setShowToast] = useState(false);
  const handleAssistance = () => {
    setShowToast(true);
  };
  const handleAlertClose = () => {
    setShowToast(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#193161' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
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
              <CartItem
                cartItems={cartItems}
                setCartItems={setCartItems}
                itemName={name}
                item={cartItems[name]}
                quantities={quantities}
                setQuantities={setQuantities}
              />
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
            onClick={handleClickOpen}
            style={{
              backgroundColor: '#148531',
              marginRight: '20px',
            }}
            variant="contained"
          >
            Submit & Pay Now
          </Button>
          <Button
            onClick={handleMenu}
            style={{
              backgroundColor: '#D40734',
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </Container>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Complete your Payment</DialogTitle>

        <DialogContent>
          <div className="tap-to-pay">
            <img
              style={{ width: '120px', padding: '10px' }}
              src="https://styles.redditmedia.com/t5_38ens/styles/communityIcon_84ih8y9d2uz81.png"
              alt=""
            />
            <img
              style={{ width: '120px', padding: '10px' }}
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Universal_Contactless_Card_Symbol.svg/1200px-Universal_Contactless_Card_Symbol.svg.png"
              alt=""
            />
            <img
              style={{ width: '130px', padding: '10px' }}
              src="https://developer.apple.com/news/images/og/apple-pay-og.jpg"
              alt=""
            />
                        <h3>Tap to Pay</h3>
            <h4>{formatter.format(totalDue)}</h4>
            <br />
            <DialogContentText id="alert-dialog-description">
              Paying in cash or need help?
            </DialogContentText>
          </div>
          <DialogActions>
            <Button
              onClick={handleAssistance}
              variant="contained"
              sx={{ backgroundColor: '#193161' }}
            >
              Request Assistance
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ backgroundColor: '#193161' }}
            >
              Submit Order
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog onClose={handleClose} open={open2}>
        <DialogTitle>Order Submitted</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The chefs are now preparing your dishes!
          </DialogContentText>
          <br />
          <DialogContentText id="alert-dialog-description">
            Done your meal? Please rate how we did today!
          </DialogContentText>
          <br />
          <DialogActions>
            <Button
              onClick={handleFeedback}
              variant="contained"
              sx={{ backgroundColor: '#193161' }}
            >
              Proceed to Feedback
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={showToast}
        onClose={handleAlertClose}
        message="Item Added Successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ width: 400 }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="info"
          sx={{ width: '100%' }}
        >
          Requested assistance. A server will help you shortly
        </Alert>
      </Snackbar>
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
