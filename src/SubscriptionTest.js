import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from "@apollo/react-hooks";

const DOOR_STATUS = gql`
    subscription {
        doorStatus
    }
`;

const SubscriptionTest = () => {

    const { data, loading, error } = useSubscription(DOOR_STATUS);

    if (loading) return <p>Loading</p>
    if (error) {
        console.log(error)
        return <p>error</p>
    }
    if (!data) return <p>Not found</p>

    return (
        <div>
            {data.doorStatus}
        </div>
    );
}

export default SubscriptionTest;
