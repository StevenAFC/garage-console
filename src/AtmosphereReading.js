import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Loader, Statistic, Icon } from "semantic-ui-react";

export const GET_ATMOSPHERE = gql`
  query {
    atmosphere {
      temperature
      humidity
    }
  }
`;

const TemperatureChart = () => {
  const { data, loading, error } = useQuery(GET_ATMOSPHERE, {
    pollInterval: 100000,
  });

  if (loading) return <Loader>Loading...</Loader>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <p>Not found</p>;

  let temperature = data.atmosphere ? data.atmosphere.temperature : 0;
  let humidity = data.atmosphere ? data.atmosphere.humidity : 0;

  let icon = "";
  let color = "";

  if (temperature > 28) {
    icon = "full";
    color = "red";
  } else if (temperature <= 28 && temperature > 22) {
    icon = "three quarters";
    color = "orange";
  } else if (temperature <= 22 && temperature > 15) {
    icon = "half";
    color = "yellow";
  } else if (temperature <= 15 && temperature > 8) {
    icon = "quarter";
    color = "teal";
  } else {
    icon = "empty";
    color = "blue";
  }

  return (
    <Statistic.Group widths="two">
      <Statistic color={color}>
        <Statistic.Value>
          <Icon name={`thermometer ${icon}`} size="small" />
          {temperature}°c
        </Statistic.Value>
        <Statistic.Label>Temperature</Statistic.Label>
      </Statistic>
      <Statistic color="blue">
        <Statistic.Value>
          <Icon name={`theme`} size="small" />
          {humidity}%
        </Statistic.Value>
        <Statistic.Label>Humidity</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

export default TemperatureChart;
