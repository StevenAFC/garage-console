import React from 'react';
import moment from 'moment';
import { Card, Icon, Feed } from 'semantic-ui-react';

const AlarmDevice = ({ device }) => {
    return (
        <Card width="200">
            <Card.Content>
                <Card.Header>
                    <Icon 
                        name={device.alarmTriggered ? 'warning circle' : 'circle'} 
                        color={device.alarmTriggered ? 'red' : 'green'} 
                    />
                    {device.name}
                    </Card.Header>
                <Card.Meta>
                    Contact Sensor
                </Card.Meta>
                <Feed>
                    {device.alerts && device.alerts.map((alert) => (
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