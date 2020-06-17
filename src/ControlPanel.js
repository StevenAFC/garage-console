import React from "react";
import Control from "./Control";
import gql from "graphql-tag";
import { Query } from "@apollo/react-components";
import { useSubscription } from "@apollo/react-hooks";

const DEVICE_STATE = gql`
  subscription {
    deviceState {
      id
      state
    }
  }
`;

export const GET_DEVICES = gql`
  query {
    deviceStates {
      device {
        id
        name
        icon
        color
        input
        alarmDevice
      }
      state {
        id
        state
      }
    }
  }
`;

const ControlPanel = () => {
  useSubscription(DEVICE_STATE);

  return (
    <div>
      <Query query={GET_DEVICES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {data.deviceStates &&
                data.deviceStates
                  .filter(
                    (deviceState) =>
                      deviceState.device &&
                      !deviceState.device.input &&
                      !deviceState.device.alarmDevice
                  )
                  .map((deviceState) => (
                    <Control
                      deviceState={deviceState}
                      key={deviceState.device.id}
                    />
                  ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default ControlPanel;
