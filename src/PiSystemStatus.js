import React from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/react-components";
import { Grid } from "semantic-ui-react";
import RadialChart from "./RadialChart";

export const GET_PI_STATUS = gql`
  query {
    piStatus {
      temp
      cpuLoad
      usedMemory
      totalMemory
    }
  }
`;

const PiSystemStatus = () => {
  let cachedData = [];

  return (
    <div>
      <Query query={GET_PI_STATUS} pollInterval={3000}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (!error) cachedData = data;

          return (
            <Grid columns={3} stackable>
              <Grid.Column>
                <RadialChart
                  max={90}
                  value={cachedData.piStatus && cachedData.piStatus.cpuLoad}
                  label={`CPU Load`}
                  unit="%"
                  color="#0091F6"
                />
              </Grid.Column>
              <Grid.Column>
                <RadialChart
                  max={90}
                  value={cachedData.piStatus && cachedData.piStatus.temp}
                  label={`CPU Temp`}
                  unit="°C"
                  color="#CB4646"
                />
              </Grid.Column>
              <Grid.Column>
                <RadialChart
                  max={90}
                  value={
                    cachedData.piStatus &&
                    (100 / cachedData.piStatus.totalMemory) *
                      cachedData.piStatus.usedMemory
                  }
                  label={`Memory`}
                  unit="%"
                  color="#62CB46"
                />
              </Grid.Column>
            </Grid>
          );
        }}
      </Query>
    </div>
  );
};

export default PiSystemStatus;
