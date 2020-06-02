import React from 'react';
import { Button } from 'semantic-ui-react'
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';

export const DEVICE_PULSE = gql` 
  mutation DevicePulse ($id: ID!) {
    devicePulse(id: $id) 
  }
`;


const GarageDoorControl = () => {

  return (
    <Mutation mutation={DEVICE_PULSE}>
      {(devicePulse, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              devicePulse({ variables: { id: 1 } });
            }}
          >
          <Button type="submit">Device Activate</Button>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default GarageDoorControl;
