import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelIcon from '@mui/icons-material/Cancel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './item.css';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const CartItem = ({ cartItems, setCartItems, itemName, item, quantities, setQuantities}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.quantity * item.price);

  const onIncrease = () => {
    setQuantity(quantity + 1);
    setPrice(price + item.price);
    setQuantities(itemQuantities());
  };
  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(price - item.price);
      setQuantities(itemQuantities());
    }
  };

  const removeItem = () => {
    let newCartItems = structuredClone(cartItems);
    delete newCartItems[itemName];
    setCartItems(newCartItems);
  };

  const itemNames = () => cartItems ? Object.keys(cartItems) : [];
  const itemQuantities = () => (
    itemNames().map((name) => (cartItems[name].quantity))
  );

  useEffect(() => {
    item.quantity = quantity;
    cartItems[itemName] = item;
    setCartItems(cartItems);
    console.log("useeffect item", cartItems);
  }, [quantity]);

  return (
    <div className="cart-block">
      <div className="cart-item" style={itemStyle}>
        <div className="row">
          <div className="col-md-2">
            <img className="item-img" src={item.img} alt="" />
          </div>
          <div className="col-md-4">
            <h5>{itemName}</h5>
          </div>
          <div className="col-md-2">
            <IconButton
              onClick={onIncrease}
              color="primary"
              aria-label="add quantity"
            >
              <AddIcon on />
            </IconButton>
            {quantity}
            <IconButton
              disabled={quantity <= 1}
              onClick={onDecrease}
              color="primary"
              aria-label="reduce quantity"
            >
              <RemoveIcon />
            </IconButton>
          </div>
          <div className="col-md-3">
            <h6>Due:</h6> {formatter.format(price)}
          </div>
          <div className="col-md-1">
            <IconButton
              onClick={removeItem}
              color="primary"
              aria-label="add quantity"
            >
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <hr class="rounded" />
      </div>
    </div>
  );
};

const itemStyle = {
  borderColor: 'black',
  borderBottomColor: 'black',
};

export default CartItem;
