// styles/stackedBarChartStyles.js
export const stackedBarChartStyles = {
  container: {
    height: "40px",
    width: "100%",
    className: "nivo-chart",
  },

  tooltipBox: {
    p: 2,
    bg: "white",
    border: "1px solid #ccc",
    borderRadius: "md",
    color: "black",
  },

  responsiveBar: {
    // groupMode: "stacked" as const,
    indexBy: () => "Bar",
    // layout: "horizontal",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    padding: 0,
    innerPadding: 1,
    enableLabel: true,
    borderRadius: 4,
    axisTop: null,
    axisRight: null,
    axisBottom: null,
    axisLeft: null,
    theme: {
      tooltip: {
        container: {
          fontSize: 12,
          background: "#292929ff",
          color: "#ffffff",
        },
      },
    },
  },
};
