import React from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/react-components";
import RadialChart from "./RadialChart";

export const GET_PI_STATUS = gql`
  query {
    piStatus {
      temp
    }
  }
`;

const ComputerTemperatureChart = () => {
  return (
    <div>
      <Query query={GET_PI_STATUS} pollInterval={3000}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <RadialChart
              max={90}
              value={data.piStatus && data.piStatus.temp}
              label={`CPU ${data.piStatus && data.piStatus.temp}°c`}
              colour="#0d8abf"
            />
          );
        }}
      </Query>
    </div>
  );
};

export default ComputerTemperatureChart;
