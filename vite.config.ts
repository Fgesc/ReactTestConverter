/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: 'ReactTestConverter/',
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts", "./src/mocks/server.js"],
  },
});
