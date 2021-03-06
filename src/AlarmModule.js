import React from "react";
import gql from "graphql-tag";
import { Card, Loader } from "semantic-ui-react";
import AlarmDevice from "./AlarmDevice";
import AlarmButton from "./AlarmButton";
import { useQuery } from "@apollo/react-hooks";

const GET_ALARM_DEVICES = gql`
  query {
    alarmDevices {
      id
      name
      alerts {
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
        state
      }
    }
  }
`;

const SUBSCRIBE_ALARM_DEVICES = gql`
  subscription {
    alarmDevices {
      id
      name
      alerts {
        createdAt
      }
    }
  }
`;

const subscribeToAlarmDevices = (subscribeToMore) => {
  subscribeToMore({
    document: SUBSCRIBE_ALARM_DEVICES,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) return prev;
      return subscriptionData.data;
    },
  });
};

const AlarmModule = () => {
  const { data: alarmDevices, loadingDevices, subscribeToMore } = useQuery(
    GET_ALARM_DEVICES
  );
  const { data: deviceStates, loadingStates } = useQuery(GET_DEVICE_STATES);

  if (loadingDevices || loadingStates)
    return <Loader active>Loading Device</Loader>;

  subscribeToMore && subscribeToAlarmDevices(subscribeToMore);

  return (
    <div>
      <Card.Group itemsPerRow={2}>
        {alarmDevices &&
          alarmDevices.alarmDevices.map((device) => (
            <AlarmDevice
              device={device}
              key={device.id}
              deviceState={
                deviceStates &&
                deviceStates.deviceStates.find((d) => d.device.id === device.id)
              }
            />
          ))}
      </Card.Group>
      <br />
      <AlarmButton />
    </div>
  );
};

export default AlarmModule;
