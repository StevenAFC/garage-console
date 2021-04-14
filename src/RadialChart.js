import React from "react";
import Chart from "react-apexcharts";

const RadialChart = ({ max, value, label, color, unit }) => {
  const displayedValue = (100 / max) * value;

  return (
    <div className="radialBar">
      <Chart
        series={[displayedValue]}
        width="120%"
        options={{
          colors: [color],
          chart: {
            toolbar: {
              show: false,
            },
          },
          grid: {
            padding: {
              top: -5,
              right: -28,
              bottom: -5,
              left: -60,
            },
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "60%",
                background: "#fff",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#fff",
                strokeWidth: "90%",
                margin: 0, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 1,
                  blur: 4,
                  opacity: 0.3,
                },
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: -13,
                  show: true,
                  color: "#888",
                  fontSize: "15px",
                },
                value: {
                  formatter: (val) => {
                    return parseInt(val) + (unit ? unit : "");
                  },
                  color: "#111",
                  fontSize: "30px",
                  show: true,
                  offsetY: 7,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: [label],
        }}
        type={"radialBar"}
      />
    </div>
  );
};

export default RadialChart;
