export const tournamentDetailsStyles = {
  button: {
    boxShadow: "md",
    fontWeight: "bold",
  },

  dialogContent: {
    fontFamily: "Saira",
    w: { base: "100vw", md: "600px" },
    h: { base: "100vh", md: "auto" },
    maxW: "100%",
    borderRadius: { base: 0, md: "md" },
    overflow: "hidden",
  },

  dialogHeader: {
    w: "100%",
    p: 0,
    mb: 4,
  },

  closeButton: {
    bgColor: "black",
    size: "sm" as const,
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 1,
  },

  mapVStack: {
    bgSize: "cover",
    h: "200px",
    w: "100%",
    minW: "250px",
    borderRadius: { base: 0, md: "4px 4px 0 0" },
    justifyContent: "flex-end",
    alignItems: "flex-start",
    boxShadow: "md",
  },

  innerVStack: {
    p: 4,
    h: "100%",
    justifyContent: "space-between",
    gap: 0,
    alignItems: "flex-start",
  },

  text: {
    textAlign: "left",
    w: "full",
    m: 0,
  },

  stackContainer: {
    direction: { base: "column", md: "row" } as const,
    align: "start",
    position: "relative",
  },

  teamBox: {
    h: "50px",
    w: "70px",
    bgSize: "cover",
  },

  absoluteHStack: {
    position: { base: "relative", md: "absolute" },
    right: { base: "4", md: "3" },
    bottom: { base: "4", md: "0" },
    pt: 5,
    pl: 4,
  },
};
