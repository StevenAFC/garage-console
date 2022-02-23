import React from "react";
import gql from "graphql-tag";
import { Card, Header, Loader } from "semantic-ui-react";
import Device from "./Device";
import { useQuery } from "@apollo/react-hooks";

const GET_DEVICES = gql`
  query {
    devices(input: true, alarmDevice: false) {
      id
      name
      icon
      alerts {
        id
        createdAt
      }
    }
  }
`;

const GET_DEVICE_STATES = gql`
  query {
    deviceStates {
      device {
        id
      }
      state {
        id
        state
      }
    }
  }
`;


const DeviceStatusPanel = () => {
  const {
    data: devices,
    loading: loadingDevices,
  } = useQuery(GET_DEVICES);

  const { data: deviceStates, loading: loadingStates } =
    useQuery(GET_DEVICE_STATES);

  if (loadingDevices || loadingStates)
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
          deviceState={
            deviceStates &&
            deviceStates.deviceStates.find((d) => d.device.id === device.id)
          }
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default DeviceStatusPanel;
