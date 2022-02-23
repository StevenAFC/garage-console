import React from "react";
import gql from "graphql-tag";
import { Card, Header, Loader } from "semantic-ui-react";
import Device from "./Device";
import { useQuery, useSubscription } from "@apollo/react-hooks";

const GET_DEVICES = gql`
  query {
    devices(input: true, alarmDevice: false) {
      id
      name
      icon
      state
      alerts {
        id
        createdAt
      }
    }
  }
`;

const DEVICE_STATE = gql`
  subscription {
    device {
      id
      state
    }
  }
`;

const DeviceStatusPanel = () => {
  useSubscription(DEVICE_STATE);

  const {
    data: devices,
    loading,
  } = useQuery(GET_DEVICES);

  if (loading)
    return <Loader active>Loading Devices</Loader>;

  return (
    <div>
      <Header>Sensors</Header>
      <Card.Group itemsPerRow={2}>
        {devices &&
        devices.devices.map((device) => (
          <Device
          device={device}
          key={device.id}
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default DeviceStatusPanel;
