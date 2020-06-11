import React from "react";
import Control from "./Control";
import gql from "graphql-tag";
import { Query } from "@apollo/react-components";

export const GET_OUTPUT_DEVICES = gql`
  query {
    outputDevices {
      id
      name
      icon
      color
    }
  }
`;

const ControlPanel = () => {
  return (
    <div>
      <Query query={GET_OUTPUT_DEVICES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {data.outputDevices &&
                data.outputDevices.map((device) => (
                  <Control device={device} key={device.id} />
                ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default ControlPanel;
