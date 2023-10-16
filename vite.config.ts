import { UserConfig } from "vite";

import react from "@vitejs/plugin-react";

export default (): UserConfig => ({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "_dist",
    assetsDir: "",
    rollupOptions: {
      output: {
        manualChunks: () => "index.js",
      },
    },
  },
  root: "src",
  server: {
    port: 1234,
    strictPort: true,
  },
});
