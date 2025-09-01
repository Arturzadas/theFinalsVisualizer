export const cardStyles = {
  container: {
    w: "100%",
    gap: 0,
    bgColor: "#3C3940",
    borderRadius: "4px",
    fontWeight: "500",
    fontFamily: "Saira",
    transition: "ease 0.2s all",
    _hover: { transform: "scale(1.005)" },
    boxShadow: "md",
    flexDirection: { base: "column", md: "row" },
    alignItems: "stretch",
    border: "1px solid #4d4d4dff",
  },

  imageSection: {
    bgSize: "cover",
    h: { base: "180px", md: "200px" },
    w: { base: "100%", md: "33%" },
    maxW: { base: "100%", md: "400px" },
    minW: { base: "100%", md: "250px" },
    borderRadius: { base: "4px 4px 0 0", md: "4px 0 0 4px" },
    justifyContent: "flex-end",
    alignItems: "flex-start",
    overflow: "hidden",
  },

  imageContent: {
    p: 4,
    alignItems: "flex-start",
    gap: 0,
    w: "100%",
  },

  detailsSection: {
    h: { base: "auto", md: "200px" },
    w: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    p: { base: 2, md: 4 },
    gap: { base: 2, md: 0 },
  },

  topRow: {
    w: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  clock: {
    fontSize: { base: "sm", md: "md" },
  },

  bottomRow: {
    w: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};
