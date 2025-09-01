export const tournamentCardStyles = {
  container: (allRoundsWon) => ({
    w: "100%",
    bg: allRoundsWon
      ? "linear-gradient(40deg, #3f6d4750 0%, #7bff2f72 100%)"
      : "linear-gradient(40deg, #333333ff 0%, #D31C4480 100%)",
    borderRadius: "md",
    gap: 4,
    p: 4,
    boxShadow: "md",
    fontFamily: "Saira",
    border: "1px solid #989898ff",
  }),

  headerHStack: {
    w: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  squadInfoHStack: {
    gap: 3,
  },

  squadImage: {
    boxSize: "36px",
  },

  squadText: {
    fontSize: "xl",
    fontWeight: "bold",
  },

  metadataHStack: {
    w: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  italicText: {
    fontStyle: "italic",
    fontSize: "sm",
  },

  roundsHStack: {
    gap: 3,
  },

  roundsVStack: {
    w: "100%",
    gap: 3,
  },
};
