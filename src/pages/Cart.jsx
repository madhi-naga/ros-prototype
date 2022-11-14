import React, { Component } from "react";
import {
  AppBar,
  Typography,
  IconButton,
  Container,
  Box,
  Toolbar,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { CartItem } from "../components/CartItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBackRounded";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./cart.css";
export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
  }

  render() {
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
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  padding: "5px",
                  fontWeight: 600,
                }}
              >
                Shopping Cart
              </Typography>
            </Toolbar>
          </AppBar>
          <Container sx={{padding:"20px"}}>
            <h3>Cart Summary:</h3>
            <div className="container" style={containerStyle}>
              {[...Array(5)].map((x, i) => (
                <CartItem />
              ))}
            </div>
          </Container>
        </Box>
        <Container sx={{padding:"20px"}}>
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
        <Container sx={{padding:"20px"}}>
          <div className="payment">
            <h3>Amount Due:</h3>
            <Button>Submit & Pay Now</Button>
            <Button>Cancel</Button>
          </div>
        </Container>
      </div>
    );
  }
}

const containerStyle = {
  backgroundColor: "#F2F2F2",
  margin: "20px",
  paddingTop: "20px",
  borderRadius: "10px",
  borderStyle: "grooved",
  borderStyle: "solid",
};

export default Cart;
