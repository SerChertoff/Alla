import { copyFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/** GitHub Pages: репозиторий Alla → сайт на /Alla/ */
const ghPagesBase = "/Alla/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? ghPagesBase : "/",
  plugins: [
    react(),
    {
      name: "spa-github-pages-404",
      closeBundle() {
        const dist = path.resolve(__dirname, "dist");
        copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
