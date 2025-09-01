import { Box } from "@chakra-ui/react";
import { ResponsiveBar } from "@nivo/bar";
import {
  formatNumberWithCommas,
  formatSeconds,
} from "../../helpers/cardHelper";
import { stackedBarChartStyles } from "./styles";

const StackedBarChart = ({ data, type }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const nivoData = [
    Object.fromEntries(data.map((item) => [item.label, item.amount])),
  ];

  const keys = data.map((item) => item.label);
  const colors = data.reduce((acc, item) => {
    acc[item.label] = item.color;
    return acc;
  }, {});

  const { container, tooltipBox, responsiveBar } = stackedBarChartStyles;

  return (
    <Box {...container}>
      <ResponsiveBar
        layout={"horizontal"}
        data={nivoData}
        keys={keys}
        colors={({ id }) => colors[id]}
        label={({ data }) => data?.label}
        tooltip={({ id, value, color }) => {
          const percent = ((value / total) * 100).toFixed(1);
          return (
            <Box {...tooltipBox}>
              <strong style={{ color }}>{id}</strong>
              <br />
              {type === "TimePlayedByArchetype"
                ? formatSeconds(value)
                : formatNumberWithCommas(value)}{" "}
              ({percent}%)
            </Box>
          );
        }}
        {...responsiveBar}
      />
    </Box>
  );
};

export default StackedBarChart;
