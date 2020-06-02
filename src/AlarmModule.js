import React from 'react';
import gql from 'graphql-tag';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Query, Mutation } from '@apollo/react-components';
import AlarmDevice from './AlarmDevice';


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

export const ALARM_STATE = gql` 
    mutation AlarmState ($state: String!) {
        alarmState(state: $state) 
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
                            />
                        ))}
                    </Card.Group>
                );
                }}
            </Query>
            <br />
            <Mutation mutation={ALARM_STATE}>
                {(alarmState) => (
                    <div>
                        <form
                            onSubmit={e => {
                            e.preventDefault();
                            alarmState({ variables: { state: "DEACTIVATE" } });
                            }}
                        >
                            <Button type="submit" negative fluid><Icon name='warning sign' />Disarm</Button>
                        </form>
                    </div>
                )}
            </Mutation>
        </div>
    )
}

export default AlarmModule