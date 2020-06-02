import React from 'react';
import gql from 'graphql-tag';
import { Icon, Button } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { useSubscription, useQuery } from "@apollo/react-hooks";

const ALARM_STATUS = gql`
    subscription {
        alarmStatus
    }
`;

const GET_ALARM_STATE = gql` 
    query {
        alarmStatus
    }
`;

const ALARM_STATE = gql` 
    mutation AlarmState ($state: String!) {
        alarmState(state: $state) 
    }
`;

const AlarmButton = () => {

    const { data: queriedData, loading } = useQuery(GET_ALARM_STATE)
    const { data: subbedData } = useSubscription(ALARM_STATUS)

    if (loading) return null

    const alarmStatus = subbedData ? subbedData && subbedData.alarmStatus : queriedData && queriedData.alarmStatus

    return (
        <Mutation mutation={ALARM_STATE}>
            {(alarmState) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();

                            alarmState({ variables: { state: alarmStatus === "DISARMED" ? "ARM" : "DISARM" } });
                        }}
                    >
                        {
                            alarmStatus === "DISARMED" ?
                            <Button type="submit" positive fluid><Icon name='warning sign' />Arm</Button>
                            :
                            <Button type="submit" negative fluid><Icon name='warning sign' />Disarm</Button>}
                    </form>
                </div>
            )}
        </Mutation>
    )
}

export default AlarmButton