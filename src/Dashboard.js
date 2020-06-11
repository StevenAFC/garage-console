import React from "react";
import TemperatureChart from "./TemperatureChart";
import ControlPanel from "./ControlPanel";
import AlarmModule from "./AlarmModule";
import { Grid, Segment } from "semantic-ui-react";

const Dashboard = () => {
  return (
    <div>
      <Grid stackable>
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
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
