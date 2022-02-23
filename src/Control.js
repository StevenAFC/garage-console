import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { Mutation } from "@apollo/react-components";
import gql from "graphql-tag";

const DEVICE_PULSE = gql`
  mutation DevicePulse($id: ID!) {
    devicePulse(id: $id)
  }
`;

const Control = ({ device }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Mutation mutation={DEVICE_PULSE}>
      {(devicePulse) => (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDisabled(true);
              devicePulse({ variables: { id: device.id } }).then(() =>
                setDisabled(false)
              );
            }}
          >
            <Button
              color={device.state ? device.color : null}
              icon
              fluid
              disabled={disabled}
              type="submit"
              labelPosition="left"
              style={{ marginBottom: 5 }}
            >
              {device.icon ? <Icon name={device.icon} /> : null}
              {device.name}
              {device.state == null ? " (Disconnected)" : ""}
            </Button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default Control;
