import React from "react";
import { Card, Icon } from "semantic-ui-react";


const Device = ({ device, deviceState }) => {
  return (
    <Card width="200">
      <Card.Content>
        <Card.Header>
          <Icon
            circular
            inverted
            size={"small"}
            name={
              device && device.icon
            }
            color={deviceState && deviceState.state.state ? "green" : "red"}
          />
          {device.name}
        </Card.Header>

      </Card.Content>
      <Card.Content extra>
        {deviceState && deviceState.state.state ? "Closed" : "Open"}
      </Card.Content>
    </Card>
  );
};

export default Device;
