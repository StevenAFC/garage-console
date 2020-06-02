import React, { useState } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { Card, Icon, Feed } from 'semantic-ui-react';
import { useSubscription } from "@apollo/react-hooks";

const ALERTS = gql`
    subscription {
        alert {
            deviceId,
            createdAt
        }
    }
`;

const AlarmDevice = ({ device }) => {

    const { data } = useSubscription(ALERTS)

    let alerts = device.alerts;
    const tripped = data && data.alert.deviceId === device.id

    if (tripped && alerts.length >= 3) {
        alerts.pop()
        alerts.unshift(data.alert)
    }

    return (
        <Card width="200">
            <Card.Content>
                <Card.Header>
                    <Icon 
                        name={tripped ? 'warning circle' : 'circle'} 
                        color={tripped ? 'red' : 'green'} 
                    />
                    {device.name}
                    </Card.Header>
                <Card.Meta>
                    Contact Sensor
                </Card.Meta>
                <Feed>
                    {alerts && alerts.map((alert) => (
                        <Feed.Event key={alert.id}>
                            <Feed.Label>
                                <Icon 
                                    name='warning circle' 
                                    color='grey' 
                                />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content={moment.unix(alert.createdAt/1000-10).fromNow()} />
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