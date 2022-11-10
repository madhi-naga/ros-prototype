import React, { Component } from 'react';
import Button from '@mui/material/Button';

export class Home extends Component {
  render() {
    return (
        <div className="App">
        <header className="App-header">
          <p>
          Restaurant Ordering System: High-Fidelity Prototype
          </p>
          <Button variant="contained" href='/Menu'>Get Started</Button>
        </header>
      </div>

    )
  }
}

export default Home