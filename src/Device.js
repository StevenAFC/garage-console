import React from "react";
import { Card, Icon } from "semantic-ui-react";


const Device = ({ device }) => {
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
            color={device && device.state ? "green" : "red"}
          />
          {device.name}
        </Card.Header>

      </Card.Content>
      <Card.Content extra>
        {device && device.state ? "Closed" : "Open"}
      </Card.Content>
    </Card>
  );
};

export default Device;
