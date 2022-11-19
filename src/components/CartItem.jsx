import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./item.css";


const CartItem = ({cartItems, setCartItems, itemName, item}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.quantity * item.price);
  
  const updateCart = (onClick) => {
    onClick();
    console.log(quantity);
    item.quantity = quantity;
    cartItems[itemName] = item;
    setCartItems(cartItems);
    console.log(cartItems[itemName])
    console.log(price);
  }
  
  const onIncrease = () => {
    setQuantity(quantity+1);
    console.log("oninc", quantity);
    setPrice(price + item.price);
  }
  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity-1);
      setPrice(price - item.price);
    }
  }
  useEffect(() => {
    item.quantity = quantity;
    cartItems[itemName] = item;
    setCartItems(cartItems);
    console.log(cartItems[itemName]);
  });

  return (
    <div className="cart-item" style={itemStyle}>
      <div className="row">
        <div className="col-md-4">
          <img className="item-img" src={item.img} alt="" />
        </div>
        <div className="col-md-4">
          <h5>{itemName}</h5>
        </div>
        <div className="col-md-2">
          <IconButton onClick={onIncrease} color="primary" aria-label="add quantity">
            <AddIcon on/>
          </IconButton>
          {quantity}
          <IconButton disabled={quantity <= 1} onClick={onDecrease} color="primary" aria-label="reduce quantity">
            <RemoveIcon />
          </IconButton>
        </div>
        <div className="col-md-2">
          <h6>Due:</h6> ${price}
        </div>
      </div>
      <hr class='rounded'/>
    </div>
  );
}


const itemStyle = {
    borderColor:"black",
    borderBottomColor: "black",
};

export default CartItem;
