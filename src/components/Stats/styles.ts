export const statsStyles = {
  container: {
    w: "100%",
    gap: 0,
    bgColor: "#3C3940",
    borderRadius: "4px",
    fontWeight: "500",
    fontFamily: "Saira",
    transition: "ease 0.2s all",
    boxShadow: "md",
    p: 4,
    border: "1px solid #989898ff",
  },

  titleText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: { base: "30px", md: "40px" },
    pb: 10,
  },

  topHStack: {
    w: "full",
    flexDir: { base: "column", md: "row" },
    justifyContent: "center",
    gap: 10,
  },

  radialBox: {
    px: { sm: 0, md: 6 },
  },

  simpleGrid: {
    columns: { base: 2, md: 3 },
    w: "full",
    gapY: 8,
  },

  graphVStack: {
    w: "full",
    pt: 8,
    alignItems: "flex-start",
  },

  select: {
    size: "sm" as const,
    minW: "200px",
    pb: 2,
  },

  trigger: {
    border: "1px solid #919191ff",
  },
};
