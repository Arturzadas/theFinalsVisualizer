import { Box } from "@chakra-ui/react";
import { ResponsiveBar } from "@nivo/bar";
import { formatNumberWithCommas, formatSeconds } from "../helpers/cardHelper";

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

  return (
    <Box height="40px" width="100%" className="nivo-chart">
      <ResponsiveBar
        data={nivoData}
        keys={keys}
        groupMode="stacked"
        indexBy={() => "Bar"}
        layout="horizontal"
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        padding={0}
        innerPadding={1}
        enableLabel={true}
        label={({ data }) => data.label}
        colors={({ id }) => colors[id]}
        borderRadius={4}
        tooltip={({ id, value, color }) => {
          const percent = ((value / total) * 100).toFixed(1);
          return (
            <Box
              p={2}
              bg="white"
              border="1px solid #ccc"
              borderRadius="md"
              color="black"
            >
              <strong style={{ color }}>{id}</strong>
              <br />
              {type === "TimePlayedByArchetype"
                ? formatSeconds(value)
                : formatNumberWithCommas(value)}{" "}
              ({percent}%)
            </Box>
          );
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        theme={{
          tooltip: {
            container: {
              fontSize: 12,
              background: "#292929ff",
              color: "#ffffff",
            },
          },
        }}
      />
    </Box>
  );
};

export default StackedBarChart;
