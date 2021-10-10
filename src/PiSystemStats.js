import React from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/react-components";
import { Grid, Loader, Statistic, Icon } from "semantic-ui-react";

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

const PiSystemStats = () => {
  let cachedData = [];

  return (
    <div>
      <Query query={GET_PI_STATUS} pollInterval={3000}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Grid>
                <Loader active />
              </Grid>
            );
          if (!error) cachedData = data;

          return (
            <Statistic.Group size="small" widths="three">
              <Statistic color="red">
                <Statistic.Value>
                  <Icon name={`thermometer`} />
                  &nbsp;{cachedData.piStatus && cachedData.piStatus.temp}°c
                </Statistic.Value>
                <Statistic.Label>CPU Temperature</Statistic.Label>
              </Statistic>
              <Statistic color="teal">
                <Statistic.Value>
                  {cachedData.piStatus && cachedData.piStatus.cpuLoad}%
                </Statistic.Value>
                <Statistic.Label>CPU Load</Statistic.Label>
              </Statistic>
              <Statistic color="orange">
                <Statistic.Value>
                  {cachedData.piStatus &&
                    Math.round(
                      (100 / cachedData.piStatus.totalMemory) *
                        cachedData.piStatus.usedMemory
                    )}
                  %
                </Statistic.Value>
                <Statistic.Label>Memory</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          );
        }}
      </Query>
    </div>
  );
};

export default PiSystemStats;
