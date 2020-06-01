import React from 'react';
import gql from 'graphql-tag';
 import { useSubscription } from "@apollo/react-hooks";

const SOMETIME_SUBSCRIPTION = gql`
    subscription {
        something
    }
`;

const SubscriptionTest = () => {

    const { data, loading, error } = useSubscription(SOMETIME_SUBSCRIPTION);

    if (loading) return <p>Loading</p>
    if (error) {
        console.log(error)
        return <p>error</p>
    }
    if (!data) return <p>Not found</p>

    console.log(data)

    return (
        <div>
            {data.something}
        </div>
    );
}

export default SubscriptionTest;
