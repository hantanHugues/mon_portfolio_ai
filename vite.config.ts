import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Détecter automatiquement le nom du repo depuis package.json
import packageJson from "./package.json";

// Extraire le nom du repo depuis le repository.url ou utiliser un nom par défaut
const getRepoName = () => {
  const repoUrl = packageJson.repository?.url || packageJson.homepage || '';
  const match = repoUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  return match ? match[2] : 'portfolio'; // Retourne 'portfolio' par défaut
};

const repoName = getRepoName();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "out",
  },
  // Base path automatique : '/' en dev, '/nom-du-repo/' en production
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
