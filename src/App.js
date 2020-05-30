import React from 'react';
import TemperatureList from './TemperatureList'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button>Lights On</button>
        <button>Lights Off</button>
        <TemperatureList />
      </header>
    </div>
  );
}

export default App;
