import React from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { Card, Icon, Feed } from 'semantic-ui-react';
import { useSubscription } from "@apollo/react-hooks";

const ALERTS = gql`
    subscription {
        alert {
            sensorName,
            createdAt

        }
    }
`;

const AlarmDevice = ({ device }) => {

    const { data } = useSubscription(ALERTS);
    console.log(device)

    return (
        <Card width="200">
            <Card.Content>
                <Card.Header>
                    <Icon 
                        name={data && data.alert.sensorName === 'REAR_DOOR_CONTACT_SENSOR' ? 'warning circle' : 'circle'} 
                        color={data && data.alert.sensorName === 'REAR_DOOR_CONTACT_SENSOR' ? 'red' : 'green'} 
                    />
                    {device.name}
                    </Card.Header>
                <Card.Meta>
                    Contact Sensor
                </Card.Meta>
                <Feed>
                    {device.alerts && device.alerts.map((alert) => (
                        <Feed.Event>
                            <Feed.Label>
                                <Icon 
                                    name='warning circle' 
                                    color='grey' 
                                />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content={moment.unix(alert.createdAt/1000).fromNow()} />
                                <Feed.Summary>
                                Sensor Activated
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    ))}
                </Feed>
            </Card.Content>
        </Card>
    )
}

export default AlarmDevice