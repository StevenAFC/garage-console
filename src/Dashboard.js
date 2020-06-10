import React from "react";
import TemperatureChart from "./TemperatureChart";
import Control from "./Control";
import AlarmModule from "./AlarmModule";
import { Grid, Segment } from "semantic-ui-react";

const Dashboard = () => {
  return (
    <div>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <TemperatureChart />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <AlarmModule />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>Empty</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Control name={"Garage Door Open"} id={1} />
              <Control name={"Lights"} id={5} />
              <Control name={"Garage Door Close"} id={6} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
