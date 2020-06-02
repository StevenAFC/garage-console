import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as d3 from 'd3';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from 'recharts';
import moment from 'moment'
import { Loader } from 'semantic-ui-react'

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
  const { data, loading, error } = useQuery(GET_ATMOSPHERES);

  if (loading) return (
    <Loader>Loading...</Loader>
  )
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  var hour = d3.timeFormat("%Y-%m-%dT%H:00:00.00Z");

  const output = d3.nest()
    .key(function(d) { return hour(new Date(d.createdAt * 1)) })
    .rollup(function(d) {
      return {
        temperature: d3.mean(d, function(e) { return e.temperature; }),
        humidity: d3.mean(d, function(e) { return e.humidity; }),
      }
    })
    .entries(data.atmospheres);

  const chartData = output.map(x => {
    return {
      time: new Date(x.key).getTime(),
      humidity: x.value.humidity,
      temperature: x.value.temperature
    }
  })

  return (
    <ResponsiveContainer height={350}>
      <AreaChart data={chartData}>
        <XAxis 
          dataKey="time"
          domain = {['auto', 'auto']}
          name = 'Time'
          scale ='time'
          tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
          type = 'number'
        />
        <YAxis yAxisId="left" unit="°c" />
        <YAxis yAxisId="right" orientation="right"  unit="%" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Tooltip 
          labelFormatter={(value) =>  moment(value).format('HH:mm')}
          formatter={(value) => parseFloat(value).toFixed(1)}
        />
        <Area 
          yAxisId="left" 
          type="monotone"
          dataKey="temperature" 
          dot={true}
          activeDot={true} 
        />
        <Area 
          yAxisId="right" 
          type="monotone" 
          dataKey="humidity" 
          dot={true}
          activeDot={true} 
        />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default TemperatureChart