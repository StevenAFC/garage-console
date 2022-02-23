import React from "react";
import Control from "./Control";
import { Loader, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useSubscription } from "@apollo/react-hooks";

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
    devices(input: false, alarmDevice: false) {
      id
      name
      icon
      color
      input
      alarmDevice
      state
    }
  }
`;

const ControlPanel = () => {
  useSubscription(DEVICE_STATE);

  const {
    data: devices,
    loading,
  } = useQuery(GET_DEVICES);

  if (loading)
  return <Loader active>Loading Controls</Loader>;

  return (
    <div>
      <Header>Controls</Header>
      {devices &&
        devices.devices.map((d) => (
          <Control
            device={d}
            key={d.id}
          />
        ))}
    </div>
  )
};

export default ControlPanel;
