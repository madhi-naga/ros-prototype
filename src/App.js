import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/Menu' element={<Menu/>} />
          <Route path='/Cart' element={<Cart/>} />
          <Route path='/Feedback' element={<Feedback/>} />
        </Routes>
      </Router>
  );
}

export default App;
