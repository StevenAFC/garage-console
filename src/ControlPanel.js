import React from "react";
import Control from "./Control";
import { Loader } from "semantic-ui-react";
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
    <Query query={GET_DEVICES}>
      {({ loading, error, data }) => {
        if (loading) return <Loader active>Loading...</Loader>;
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
  );
};

export default ControlPanel;
