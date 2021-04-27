import React from "react";
import TemperatureChart from "./TemperatureChart";
import ControlPanel from "./ControlPanel";
import AlarmModule from "./AlarmModule";
import { Grid, Segment } from "semantic-ui-react";
import AlarmMessage from "./AlarmMessage";
import PiSystemStatus from "./PiSystemStatus";
import PushMessageSubscriber from "./PushMessageSubscriber";

const Dashboard = () => {
  return (
    <div>
      <Grid stackable>
        <AlarmMessage />
        <PushMessageSubscriber />
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <AlarmModule />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <TemperatureChart />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <ControlPanel />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <PiSystemStatus />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
