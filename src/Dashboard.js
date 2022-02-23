import React from "react";
import ControlPanel from "./ControlPanel";
import AlarmModule from "./AlarmModule";
import DeviceStatusPanel from "./DeviceStatusPanel";
import { Grid, Segment } from "semantic-ui-react";
import AlarmMessage from "./AlarmMessage";
import PushMessageSubscriber from "./PushMessageSubscriber";
import Stats from "./Stats";

const Dashboard = () => {
  return (
    <div>
      <Grid stackable>
        <AlarmMessage />
        <PushMessageSubscriber />
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <ControlPanel />
            </Segment>
            <Segment>
              <AlarmModule />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Stats />
            </Segment>
            <Segment>
              <DeviceStatusPanel />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
