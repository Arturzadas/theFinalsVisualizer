export const fileInputStyles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    cursor: "pointer",
    p: 10,
  },

  inner: {
    w: "100%",
    h: "100%",
    border: "1px solid gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2xl",
    transition: "ease 0.2s all",
    _hover: { transform: "scale(1.01)" },
  },

  uploadIcon: {
    size: 100,
    fill: "gray",
  },

  uploadText: {
    fontSize: "xl",
    color: "gray",
  },
};
