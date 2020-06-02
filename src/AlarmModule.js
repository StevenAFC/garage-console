import React from 'react';
import gql from 'graphql-tag';
import { Card, Icon, Button } from 'semantic-ui-react';
import { useQuery } from "@apollo/react-hooks";
import AlarmDevice from './AlarmDevice';


export const GET_ALARM_DEVICES = gql`
    query {
        getAlarmDevices {
            id
            name
            createdAt
            alerts {
                createdAt
            }
        }
    }
`;

const AlarmModule = () => {

    const { data: devices, loading, error } = useQuery(GET_ALARM_DEVICES);

    if ( loading ) return <p>Loading...</p>
    if ( error ) console.log(error)

    return (
        <div>
            <Card.Group itemsPerRow={2}>
                {devices.getAlarmDevices && devices.getAlarmDevices.map((device) => (
                    <AlarmDevice
                        device={device}
                    />
                ))}
            </Card.Group>
            <br />
            <Button negative fluid><Icon name='warning sign' />Disarm</Button>
        </div>
    )
}

export default AlarmModule