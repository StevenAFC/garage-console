import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as d3 from "d3";
import moment from "moment";
import { Loader } from "semantic-ui-react";
import Chart from "react-apexcharts";

export const GET_ATMOSPHERES = gql`
  query {
    atmospheres {
      temperature
      humidity
      createdAt
    }
  }
`;

const TemperatureChart = () => {
  const { data, loading, error } = useQuery(GET_ATMOSPHERES, {
    pollInterval: 180000,
  });

  if (loading) return <Loader>Loading...</Loader>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <p>Not found</p>;

  var hour = d3.timeFormat("%Y-%m-%dT%H:00:00.00Z");

  const output = d3.rollup(
    data.atmospheres,
    (v) => {
      return {
        temperature: d3.median(v, (d) => d.temperature),
        humidity: d3.median(v, (d) => d.humidity),
      };
    },
    (d) => hour(new Date(d.createdAt * 1))
  );

  let temperatureData = [];
  let humidityData = [];

  output.forEach((o, a) => {
    temperatureData.push([moment(a).unix() * 1000, o.temperature.toFixed(1)]);
    humidityData.push([moment(a).unix() * 1000, o.humidity.toFixed(1)]);
  });

  temperatureData = temperatureData.sort((a, b) => a[0] - b[0]);
  humidityData = humidityData.sort((a, b) => a[0] - b[0]);

  return (
    <div className="mixed-chart">
      <Chart
        series={[
          {
            name: "Temperature",
            type: "area",
            data: temperatureData,
            zoom: {
              autoScaleYaxis: true,
            },
          },
          {
            name: "Humidity",
            type: "area",
            data: humidityData,
            zoom: {
              autoScaleYaxis: true,
            },
          },
        ]}
        options={{
          chart: {
            id: "area-datetime",
            type: "area",
          },
          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: [
            {
              title: {
                text: "Temperature",
              },
            },
            {
              opposite: true,
              title: {
                text: "Humidity",
              },
            },
          ],
          xaxis: {
            type: "datetime",
          },
        }}
        type={"area"}
      />
    </div>
  );
};

export default TemperatureChart;
