import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { Mutation } from "@apollo/react-components";
import gql from "graphql-tag";

export const DEVICE_PULSE = gql`
  mutation DevicePulse($id: ID!) {
    devicePulse(id: $id) {
      state
      duration
    }
  }
`;

const Control = ({ device }) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Mutation mutation={DEVICE_PULSE}>
      {(devicePulse, { data }) => (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDisabled(true);
              devicePulse({ variables: { id: device.id } }).then((response) => {
                console.log(response.data);
                if (
                  response.data.devicePulse &&
                  response.data.devicePulse.duration
                ) {
                  console.log("true");
                  setLoading(true);
                  setTimeout(() => {
                    console.log("false");
                    setLoading(false);
                  }, response.data.devicePulse.duration);
                }
              });

              setDisabled(false);
            }}
          >
            <Button
              color={device.color}
              icon
              fluid
              disabled={disabled}
              type="submit"
              labelPosition="left"
              loading={loading}
              style={{ marginBottom: 5 }}
            >
              {device.icon ? <Icon name={device.icon} /> : null}
              {device.name}
            </Button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default Control;
