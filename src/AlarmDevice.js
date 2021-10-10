import React from "react";
import moment from "moment";
import { Card, Icon, Feed } from "semantic-ui-react";

const convertDate = (date) => {
  let d = moment
    .unix(date / 1000)
    .subtract(1, "seconds")
    .fromNow();

  if (d === "Invalid date") {
    d = moment(date).subtract(1, "seconds").fromNow();
  }

  return d;
};

const AlarmDevice = ({ device, deviceState }) => {
  return (
    <Card width="200">
      <Card.Content>
        <Card.Header>
          <Icon
            name={
              deviceState && deviceState.state.state
                ? "circle"
                : "warning circle"
            }
            color={deviceState && deviceState.state.state ? "green" : "red"}
          />
          {device.name}
        </Card.Header>
        <Feed>
          {device.alerts &&
            device.alerts.map((alert) => (
              <Feed.Event key={device.id}>
                <Feed.Label>
                  <Icon name="warning circle" color="grey" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>Sensor Activated</Feed.Summary>
                  <Feed.Date content={convertDate(alert.createdAt)} />
                </Feed.Content>
              </Feed.Event>
            ))}
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default AlarmDevice;
