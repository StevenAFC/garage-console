import React from 'react';
import gql from 'graphql-tag';
import { Card } from 'semantic-ui-react';
import { Query } from '@apollo/react-components';
import AlarmDevice from './AlarmDevice';
import AlarmButton from './AlarmButton';


export const GET_ALARM_DEVICES = gql`
    query {
        alarmDevices {
            id
            name
            alarmTriggered
            alerts {
                createdAt
            }
        }
    }
`;

const ALARM_DEVICES = gql`
    subscription {
        alarmDevices {
            id
            name
            alarmTriggered
            alerts {
                createdAt
            }
        }
    }
`;

const AlarmModule = () => {

    const subscribeToDevices = subscribeToMore => {
        subscribeToMore({
            document: ALARM_DEVICES,
            updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev
                return subscriptionData.data
            }
        })
    }

    return (
        <div>
            <Query 
                query={GET_ALARM_DEVICES}
            >
                {({ loading, error, data, subscribeToMore }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                
                subscribeToDevices(subscribeToMore)

                return (
                    <Card.Group itemsPerRow={2}>
                        {data.alarmDevices && data.alarmDevices.map(device => (
                            <AlarmDevice
                                device={device}
                                key={device.id}
                            />
                        ))}
                    </Card.Group>
                );
                }}
            </Query>
            <br />
            <AlarmButton />
        </div>
    )
}

export default AlarmModule