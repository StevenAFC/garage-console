import React from 'react';
import { Button } from 'semantic-ui-react'
const Gpio = require('onoff').Gpio;

const GarageDoorControl = () => {

    const openDoor = () => {
        const openPin = new Gpio(17, 'out')
        openPin.writeSync(1)
        openPin.unexport()
    }

  return (
    <div>
        <Button onClick={openDoor}>Garage Door Open</Button>
        <Button>Garage Door Close</Button>
    </div>
  );
}

export default GarageDoorControl;
