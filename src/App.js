import React from 'react';
import TemperatureChart from './TemperatureChart3'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button>Lights On</button>
        <button>Lights Off</button>
        <TemperatureChart />
      </header>
    </div>
  );
}

export default App;
