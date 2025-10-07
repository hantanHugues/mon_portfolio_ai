import { useInView as useFramerInView } from "framer-motion";
import { useRef } from "react";

export const useInView = (options = {}) => {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, {
    once: false, // ⚠️ PROBLÈME TROUVÉ ! était sur "true"
    margin: "-50px", // Réduit la marge pour déclencher plus tôt
    ...options
  });

  return { ref, isInView };
};
