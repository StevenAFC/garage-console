import React from 'react';
import { Button } from 'semantic-ui-react'
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const OPEN_GARAGE_DOOR = gql`
    query {
      openGarageDoor
    }
`;

export const CLOSE_GARAGE_DOOR = gql`
    query {
      closeGarageDoor
    }
`;


const GarageDoorControl = () => {

  const [openGarageDoor] = useLazyQuery(OPEN_GARAGE_DOOR, { fetchPolicy: "no-cache" });
  const [closeGarageDoor] = useLazyQuery(CLOSE_GARAGE_DOOR, { fetchPolicy: "no-cache" });

  return (
    <div>
      <Button onClick={() => openGarageDoor()}>Garage Door Open</Button>
      <Button onClick={() => closeGarageDoor()}>Garage Door Close</Button>
    </div>
  );
}

export default GarageDoorControl;
