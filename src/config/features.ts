/**
 * Configuration des features du projet
 * Contrôle l'inclusion/exclusion de certaines parties au build
 */

export const FEATURES = {
  // Set to true to enable admin dashboard, false to disable and remove from bundle
  ENABLE_ADMIN: import.meta.env.VITE_ENABLE_ADMIN === 'true',
} as const;
