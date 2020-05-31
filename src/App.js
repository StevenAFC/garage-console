import React from 'react';
import Dashboard from './Dashboard'
import { Container, Header, Icon } from 'semantic-ui-react'
import './App.css';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <Container>
        <Header as='h2' inverted icon textAlign='center'>
          <Icon name='warehouse' />
          Garage Console
        </Header>
        <br />
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
