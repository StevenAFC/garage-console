import React from 'react';
import RadialChart from './RadialChart'
var si = require("systeminformation")

const ComputerTemperatureChart = () => {

    var cpu_temp;

    si.cpuTemperature()
        .then((d => { cpu_temp = d }));

    console.log(cpu_temp)

  return (
    <RadialChart
        max = {90}
        value = {cpu_temp}
        label = {`CPU ${cpu_temp}°c`}
        colour = "#0d8abf"
    />
  )
}

export default ComputerTemperatureChart