import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          nivo: ["@nivo/bar"],
          charts: ["src/components/StackedBarChart/StackedBarChart"],
          stats: [
            "src/components/Stats/Stats",
            "src/components/Details/Details",
          ],
          tournament: ["src/components/TournamentDetails/TournamentDetails"],
        },
      },
    },
  },
});
