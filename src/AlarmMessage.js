import React from "react";
import gql from "graphql-tag";
import { Message, Grid, Icon, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

const ALARM_STATUS = gql`
  subscription {
    alarmStatus
  }
`;

const GET_ALARM_STATE = gql`
  query {
    alarmStatus
  }
`;

const subscribeToAlarmState = (subscribeToMore) => {
  subscribeToMore({
    document: ALARM_STATUS,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) return prev;
      return subscriptionData.data;
    },
  });
};

const AlarmMessage = () => {
  const { data, loading, subscribeToMore } = useQuery(GET_ALARM_STATE);

  if (loading) return <Loader active />;

  subscribeToMore && subscribeToAlarmState(subscribeToMore);

  if (data && data.alarmStatus === "ALERTED") {
    return (
      <Grid.Row>
        <Grid.Column>
          <Message icon color="red">
            <Icon name="alarm" loading />
            <Message.Content>
              <Message.Header>
                ALERT!!! The garage alarm has been triggered!
              </Message.Header>
            </Message.Content>
          </Message>
        </Grid.Column>
      </Grid.Row>
    );
  } else {
    return false;
  }
};

export default AlarmMessage;
