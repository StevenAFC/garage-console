import React from "react";
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
    device {
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
  useSubscription(DEVICE_STATE);

  const {
    data: devices,
    loading: loadingDevices,
    subscribeToMore,
  } = useQuery(GET_ALARM_DEVICES);

  if (loadingDevices)
    return <Loader active>Loading Device</Loader>;

  subscribeToMore && subscribeToAlarmDevices(subscribeToMore);

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
