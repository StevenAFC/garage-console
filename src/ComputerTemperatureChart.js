import React from 'react';
import RadialChart from './RadialChart'
var fs = require("fs")

const ComputerTemperatureChart = () => {

    var temp_c = 0;

    try {
        const temp = fs.readFileSync("/sys/class/thermal_zone0/temp")
        temp_c = temp / 1000
    } catch {
        temp_c = 0;
    }


  return (
    <RadialChart
        max = {90}
        value = {temp_c}
        label = {`CPU ${temp_c}°c`}
        colour = "#0d8abf"
    />
  )
}

export default ComputerTemperatureChart