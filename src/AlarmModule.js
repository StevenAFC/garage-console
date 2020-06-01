import React from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { Card, Icon, Button, Feed } from 'semantic-ui-react';
import { useSubscription, useQuery } from "@apollo/react-hooks";

const ALERTS = gql`
    subscription {
        alerts {
            sensorName,
            createdAt
        }
    }
`;

export const GET_ALERTS = gql`
    query {
        alerts {
            sensorName
            createdAt
        }
    }
`;

const AlarmModule = () => {

    const { data } = useSubscription(ALERTS);
    const { data: alerts, loading, error } = useQuery(GET_ALERTS);

    if ( loading ) return <p>Loading...</p>
    if ( error ) console.log(error)

    return (
        <div>
            <Card.Group itemsPerRow={2}>
                <Card width="200">
                    <Card.Content>
                        <Card.Header>
                            <Icon 
                                name={data && data.alert.sensorName === 'REAR_DOOR_CONTACT_SENSOR' ? 'warning circle' : 'circle'} 
                                color={data && data.alert.sensorName === 'REAR_DOOR_CONTACT_SENSOR' ? 'red' : 'green'} 
                            />
                            Back Door
                            </Card.Header>
                        <Card.Meta>
                            Contact Sensor
                        </Card.Meta>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label>
                                    <Icon 
                                        name='warning circle' 
                                        color='grey' 
                                    />
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Date content='1 day ago' />
                                    <Feed.Summary>
                                    Sensor Activated
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            <Icon name='circle' color='green' />Internal
                        </Card.Header>
                        <Card.Meta>
                            Motion Sensor
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Card.Group>
            <br />
            <Button negative fluid><Icon name='warning sign' />Disarm</Button>
        </div>
    )
}

export default AlarmModule