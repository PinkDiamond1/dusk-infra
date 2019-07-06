import React from "react";
import { makeStyles } from "@material-ui/styles";

import { ResponsiveContainer } from "recharts";

import ChartistGraph from "react-chartist";

import Title from "./Title";
import LastUpdate from "./LastUpdate";
import * as chartUtils from "../../chart-utils";

const options = {
  fullWidth: true,
  showArea: true,
  chartPadding: {
    right: 40,
  },
  high: 100,
  low: 0,
  showPoint: true,
  lineSmooth: true,
  axisX: {
    labelInterpolationFnc: chartUtils.skipLabels,
  },
  classNames: {
    line: "cpu-line",
    point: "cpu-point",
    area: "cpu-area",
  },
};

const type = "Line";
const useStyles = makeStyles(theme => ({
  lastUpdate: {
    color: "#0544d3",
  },
}));

export default ({ data }) => {
  const classes = useStyles();
  return (
    <>
      <Title>CPU Load (%)</Title>
      <ResponsiveContainer>
        <ChartistGraph
          data={data}
          type={type}
          options={options}
          listener={chartUtils.listener("cpu-timestamp")}
        />
      </ResponsiveContainer>
      <LastUpdate
        timestamp={data.labels[data.labels.length - 1]}
        className={classes.lastUpdate}
      />
    </>
  );
};
