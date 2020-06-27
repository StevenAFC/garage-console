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
    pollInterval: 60000,
  });

  if (loading) return <Loader>Loading...</Loader>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <p>Not found</p>;

  var hour = d3.timeFormat("%Y-%m-%dT%H:00:00.00Z");

  const output = d3
    .nest()
    .key(function (d) {
      return hour(new Date(d.createdAt * 1));
    })
    .rollup(function (d) {
      return {
        temperature: d3.median(d, function (e) {
          return e.temperature;
        }),
        humidity: d3.median(d, function (e) {
          return e.humidity;
        }),
      };
    })
    .entries(data.atmospheres);

  let temperatureData = [];
  let humidityData = [];

  output.forEach((o) => {
    temperatureData.push([
      moment(o.key).unix() * 1000,
      o.value.temperature.toFixed(1),
    ]);
    humidityData.push([
      moment(o.key).unix() * 1000,
      o.value.humidity.toFixed(1),
    ]);
  });

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
