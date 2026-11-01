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
              // re-enable on failure too, or a dropped request locks the button
              devicePulse({ variables: { id: device.id } })
                .catch((error) => console.log(error))
                .finally(() => setDisabled(false));
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
