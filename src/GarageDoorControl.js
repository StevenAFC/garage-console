import React from 'react';
import { Button } from 'semantic-ui-react'
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const OPEN_GARAGE_DOOR = gql`
    query {
      openGarageDoor
    }
`;


const GarageDoorControl = () => {

  const [openGarageDoor, { data, loading }] = useLazyQuery(OPEN_GARAGE_DOOR);

  if (loading) return <p>Loading ...</p>;
  if (data) {
    console.log(data);
  }

  return (
    <div>
      <Button onClick={() => openGarageDoor()}>Garage Door Open</Button>
      <Button>Garage Door Close</Button>
    </div>
  );
}

export default GarageDoorControl;
