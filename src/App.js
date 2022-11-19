import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Feedback from './pages/Feedback/Feedback';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState({}); //Looks like { itemname: {img: "imglink", quantity: 2, price:15 //price per item} }
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/Menu' element={<Menu cartItems={cartItems} setCartItems={setCartItems} />}/>
          <Route path='/Cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>} />
          <Route path='/Feedback' element={<Feedback cartItems={cartItems} setCartItems={setCartItems}/>} />
        </Routes>
      </Router>
  );
}

export default App;
