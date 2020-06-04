import React from "react";
import TemperatureChart from "./TemperatureChart";
import GarageDoorControl from "./GarageDoorControl";
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
              <GarageDoorControl name={"Garage Door Open"} id={1} />
              <GarageDoorControl name={"Lights"} id={5} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
