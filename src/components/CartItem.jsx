import React, { Component } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./item.css";

export class CartItem extends Component {
  render() {
    return (
      <div className="cart-item" style={itemStyle}>
        <div className="row">
          <div className="col-md-4">
            <img className="item-img" src="https://foodess.com/wp-content/uploads/2022/10/Foodess-Best-Butter-Chicken-1-2.jpg" alt="" />
          </div>
          <div className="col-md-4">
            <h4>Item Name</h4>
            <p>Description</p>
          </div>
          <div className="col-md-2">
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddIcon />
            </IconButton>
            0
            <IconButton color="primary" aria-label="add to shopping cart">
              <RemoveIcon />
            </IconButton>
          </div>
          <div className="col-md-2">
            <h6>Due:</h6> $10.00
          </div>
        </div>
        <hr class='rounded'/>
      </div>
    );
  }
}

const itemStyle = {
    borderColor:"black",
    borderBottomColor: "black",
};

export default CartItem;
