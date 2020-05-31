import React from 'react';
import TemperatureChart from './TemperatureChart'
import ComputerTemperatureChart from './ComputerTemperatureChart'
import { Button, Grid, Segment } from 'semantic-ui-react'

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
                        <Button>Garage Door Open / Close</Button>
                        <Button>Lights On / Off</Button>
                    </Segment>
                </Grid.Column>  
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Segment>
                        <ComputerTemperatureChart />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <TemperatureChart />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
  );
}

export default Dashboard;
