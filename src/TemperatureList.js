import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_ATMOSPHERES = gql`
    query {
        Atmospheres {
            id
            temperature
            humidity
        }
    }
`;

const TemperatureList = () => {
    const { data, loading, error } = useQuery(GET_ATMOSPHERES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    console.log(data.Atmospheres);

    return (
        <div>
            <p>Moosadasdas</p>
            <ul>
                {data.Atmospheres.map(atmosphere => (
                    <li>{atmosphere.temperature}</li>
                ))}
            </ul>
        </div>
    );
};

export default TemperatureList