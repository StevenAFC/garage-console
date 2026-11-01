import React, { useEffect } from "react";
import gql from "graphql-tag";
import { Card, Loader, Header } from "semantic-ui-react";
import AlarmDevice from "./AlarmDevice";
import AlarmButton from "./AlarmButton";
import { useQuery, useSubscription } from "@apollo/react-hooks";

const GET_ALARM_DEVICES = gql`
  query {
    devices(input: true, alarmDevice: true) {
      id
      name
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
    deviceState {
      id
      state
    }
  }
`;

const SUBSCRIBE_ALARM_DEVICES = gql`
  subscription {
    alarmDevices {
      id
      name
      alerts {
        id
        createdAt
      }
    }
  }
`;

const subscribeToAlarmDevices = (subscribeToMore) =>
  subscribeToMore({
    document: SUBSCRIBE_ALARM_DEVICES,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const updates = subscriptionData.data.alarmDevices;
      return {
        ...prev,
        devices: prev.devices.map((device) => {
          const update = updates.find((d) => d.id === device.id);
          return update ? { ...device, ...update } : device;
        }),
      };
    },
  });

const AlarmModule = () => {
  useSubscription(DEVICE_STATE);

  const {
    data: devices,
    loading,
    subscribeToMore,
  } = useQuery(GET_ALARM_DEVICES);

  // Subscribe once; the returned function unsubscribes on unmount
  useEffect(() => subscribeToAlarmDevices(subscribeToMore), [subscribeToMore]);

  if (loading)
    return <Loader active>Loading Device</Loader>;

  return (
    <div>
      <Header>Alarm</Header>
      <Card.Group itemsPerRow={2}>
        {devices &&
          devices.devices.map((device) => (
            <AlarmDevice
              device={device}
              key={device.id}
            />
          ))}
      </Card.Group>
      <br />
      <AlarmButton />
    </div>
  );
};

export default AlarmModule;
