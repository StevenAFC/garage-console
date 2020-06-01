import React from 'react';
import TemperatureChart from './TemperatureChart'
import GarageDoorControl from './GarageDoorControl'
import SubscriptionTest from './SubscriptionTest'
import AlarmModule from './AlarmModule'
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
                        <GarageDoorControl />
                        <Button>Lights On / Off</Button>
                    </Segment>
                </Grid.Column>  
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Segment>
                        <SubscriptionTest />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <AlarmModule />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
  );
}

export default Dashboard;
