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
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CartItem from '../../components/CartItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../cart.css"
import Star from './Star'
import FeedbackItem from './FeedbackItem';
import "./Feedback.css"
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Feedback = ({ cartItems, setCartItems }) => {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFeedback = () => {
    navigate('/Feedback');
  };

  const handleCart = () => {
    navigate('/Cart');
  };
  const handleHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#193161'}}>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                padding: '5px',
                fontWeight: 600
              }}
            >
              Feedback
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ padding: '20px' }}>
          <h3>Item Rating:</h3>
          <div className="container" style={containerStyle}>
            {itemNames().map((name) => (
              <FeedbackItem
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
        <Container sx={{ padding: '20px' }}>
          <h3>Overall Rating:</h3>
          <div className="container" style={containerStyle}>
            <div className='overall'>
            <ul >
                <li className="allitem"><h4>Food:&nbsp; </h4> <Star/></li>
                <li className="allitem"><h4>Price:&nbsp; </h4> <Star/></li>
                <li className="allitem"><h4>Environment:&nbsp; </h4> <Star/></li>
                <li className="allitem"><h4>Timing:&nbsp; </h4> <Star/></li>
                <li className="allitem"><h4>Overall:&nbsp; </h4> <Star/></li>
            </ul>
            </div>
          </div>
        </Container>
        <Container sx={{ padding: '20px' }}>
        <div className="requirements">
          <h3>Additional Comments:</h3>
          <TextField
            id="outlined-textarea"
            label=""
            placeholder="Please type in your additional feedback"
            rows={2}
            multiline
            fullWidth
          />
        </div>
      </Container>
      <Container sx={{ padding: '20px' }}>
        <div className="payment">
          <Button
            onClick={handleClickOpen}
            style={{
              backgroundColor: '#148531',
              marginRight:'20px'
            }}
            variant="contained"
          >
            Submit Feedback
          </Button>
          <Button
            onClick={handleHome}
            style={{
              backgroundColor: '#D40734',
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </Container>
      </Box>

      
      
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Thank you</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your feedback has been submitted successfully! 
          </DialogContentText>
          <br />
          <DialogActions>
            <Button onClick={handleHome} variant="contained" autoFocus sx={{ backgroundColor: '#193161'}}>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
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

export default Feedback;