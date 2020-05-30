import React from 'react';
import logo from './logo.svg';
import TemperatureChart from './TemperatureChart'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button>Lights On</button>
        <button>Lights Off</button>
        <TemperatureChart />
      </header>
    </div>
  );
}

export default App;
