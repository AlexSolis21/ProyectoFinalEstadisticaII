import { FC, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);

interface props {
  props?: HighchartsReact.Props;
  resultado: number;
  significancia: number;
}

export const BellCurve: FC<props> = ({ props, significancia, resultado }) => {
  let range = 0;
  resultado > significancia
    ? (range = resultado * 2)
    : (range = significancia * 2);

  resultado < 0
    ? (significancia = -Math.abs(significancia))
    : (significancia = significancia);

  const data = [
    { y: 0, x: -Math.abs(range), name: "" },
    { y: 1.4, x: resultado, name: "res" },
    { y: 1.4, x: significancia, name: "t" },
    { y: 0, x: range, name: "" },
  ];

  const options: Highcharts.Options = {
    title: {
      text: "Gráfica",
    },

    xAxis: [
      {
        title: {
          text: "Data",
        },
        alignTicks: false,
        plotLines: [
          {
            color: "#525E75",
            width: 2,
            value: 0,
          },
          {
            color: "#EC994B",
            width: 3,
            value: resultado,
          },
          {
            color: "#EC994B",
            width: 3,
            value: significancia,
          },
        ],
      },
      {
        alignTicks: false,
        opposite: true,
      },
    ],

    yAxis: [
      {
        title: { text: "Data" },
      },
      {
        title: { text: "Bell curve" },
        opposite: true,
      },
    ],
    series: [
      {
        name: "",
        type: "bellcurve",
        xAxis: 1,
        yAxis: 1,
        baseSeries: 1,
        zIndex: 999,
        zoneAxis: "x",
        zones: [
          {
            value: 4,
            color: "rgb(0, 0, 0, 0.2)",
          },
        ],
      },
      {
        name: "Resultados",
        type: "scatter",
        data: data,
        dataLabels: {
          enabled: true,
          formatter: function () {
            if (typeof this.key === "string") {
              return this.x + " " + this.key;
            }
          },
        },
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
          radius: 1.5,
        },
      },
    ],
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
