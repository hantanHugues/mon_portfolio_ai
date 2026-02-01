/**
 * Configuration API Backend
 * 
 * Pour le développement local : utilise http://localhost:3000
 * Pour la production (GitHub Pages) : utilise l'URL Render
 * 
 * INSTRUCTIONS :
 * 1. Une fois ton backend déployé sur Render, tu auras une URL comme :
 *    https://portfolio-backend-xxxx.onrender.com
 * 
 * 2. Remplace "CHANGE_ME_WITH_YOUR_RENDER_URL" par cette URL
 * 
 * 3. Rebuild avec : npm run build
 * 
 * 4. Le dossier "out" sera prêt pour GitHub Pages avec la bonne config
 */

// URL du backend en production (RENDER)
const PRODUCTION_API_URL = "https://portfolio-backend-l06w.onrender.com";

// URL du backend en développement local
const DEVELOPMENT_API_URL = "http://localhost:3000";

// Détection automatique de l'environnement
export const API_URL = import.meta.env.PROD 
  ? PRODUCTION_API_URL 
  : DEVELOPMENT_API_URL;

// Vérification de configuration
if (import.meta.env.PROD && PRODUCTION_API_URL.includes("CHANGE_ME")) {
  console.warn(
    "⚠️ ATTENTION : L'URL de l'API backend n'est pas configurée !\n" +
    "Édite src/config/api.ts et remplace PRODUCTION_API_URL avec ton URL Render"
  );
}

// Endpoints disponibles
export const API_ENDPOINTS = {
  health: `${API_URL}/api/health`,
  projects: `${API_URL}/api/projects`,
  project: (name: string) => `${API_URL}/api/projects/${name}`,
  organizations: `${API_URL}/api/organizations`,
  achievements: `${API_URL}/api/achievements`,
};

// Helper pour fetch avec gestion d'erreurs
export async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || "Unknown API error");
    }
    
    return data;
  } catch (error) {
    console.error("❌ Erreur API:", error);
    throw error;
  }
}
