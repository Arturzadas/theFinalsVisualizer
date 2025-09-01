export const visualizerStyles = {
  container: {
    gap: 5,
    px: { base: 3, md: 10 },
    py: 10,
    w: "100vw",
    maxW: "1920px",
  },

  heading: {
    fontFamily: "Saira",
    fontStyle: "italic",
    w: "full",
    textAlign: "left",
    py: 10,
    pt: 20,
    fontSize: { base: "30px", md: "40px" },
  },

  circle: {
    w: "40px",
    h: "40px",
    borderRadius: "full",
    border: "1px solid white",
    justifyContent: "center",
    alignItems: "center",
    transition: "ease 0.2s all",
    _hover: {
      transform: "scale(1.1)",
      bgColor: "whiteAlpha.300",
    },
    cursor: "pointer",
    userSelect: "none",
  },

  paginationHStack: {
    w: "full",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 2,
    pb: 20,
  },
};
