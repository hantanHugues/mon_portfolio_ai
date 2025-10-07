import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

export const useParticles = (containerId: string) => {
  useEffect(() => {
    // Configuration personnalisée pour votre thème OKLCH
    const particlesConfig = {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ["#e91e63", "#9c27b0", "#673ab7", "#3f51b5"] // Couleurs de votre thème
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#e91e63",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 0.5
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };

    // Charger particles.js de manière asynchrone
    const loadParticles = async () => {
      try {
        // Import dynamique de particles.js
        await import('particles.js');
        
        if (window.particlesJS) {
          window.particlesJS(containerId, particlesConfig);
        }
      } catch (error) {
        console.log('Particles.js non disponible, continuons sans les particules');
      }
    };

    loadParticles();

    // Cleanup
    return () => {
      const canvas = document.querySelector(`#${containerId} canvas`);
      if (canvas) {
        canvas.remove();
      }
    };
  }, [containerId]);
};
