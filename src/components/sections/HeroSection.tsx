import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { MotionDiv, MotionH1, MotionP, fadeInUp, staggerContainer, staggerItem, blurToFocus, scaleInBounce, slideInFromBottom } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useState, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export const HeroSection = () => {
  const { ref, isInView } = useInView();
  const { scrollY } = useScrollDirection();
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const getTechIcon = (name: string) => {
    const iconProps = {
      className: "w-4 h-4",
      style: { filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' }
    };

    switch (name) {
      case "React/Next.js":
        return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg" alt="React" {...iconProps} style={{...iconProps.style, filter: 'invert(0.3) sepia(1) saturate(3) hue-rotate(180deg) brightness(1.2) drop-shadow(0 0 4px rgba(97,218,251,0.5))'}} />;
      case "TypeScript":
        return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg" alt="TypeScript" {...iconProps} style={{...iconProps.style, filter: 'invert(0.2) sepia(1) saturate(2) hue-rotate(200deg) brightness(1.1) drop-shadow(0 0 4px rgba(49,120,198,0.5))'}} />;
      case "Node.js":
        return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg" alt="Node.js" {...iconProps} style={{...iconProps.style, filter: 'invert(0.4) sepia(1) saturate(3) hue-rotate(80deg) brightness(1.2) drop-shadow(0 0 4px rgba(51,153,51,0.5))'}} />;
      case "Arduino/IoT":
        return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/arduino.svg" alt="Arduino" {...iconProps} style={{...iconProps.style, filter: 'invert(0.3) sepia(1) saturate(2) hue-rotate(170deg) brightness(1.1) drop-shadow(0 0 4px rgba(0,151,157,0.5))'}} />;
      case "Python":
        return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg" alt="Python" {...iconProps} style={{...iconProps.style, filter: 'invert(0.2) sepia(1) saturate(2) hue-rotate(200deg) brightness(1.1) drop-shadow(0 0 4px rgba(55,118,171,0.5))'}} />;
      case "Robotique":
        return <span className="text-base">🤖</span>;
      default:
        return <span className="text-base">💻</span>;
    }
  };

  useEffect(() => {
    if (isInView) {
      // Démarrer l'effet machine à écrire après un petit délai
      const timer1 = setTimeout(() => setShowTypewriter(true), 800);
      // Démarrer l'effet de défloutage après que le nom soit écrit
      const timer2 = setTimeout(() => setShowDescription(true), 2500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Reset quand pas en vue
      setShowTypewriter(false);
      setShowDescription(false);
    }
  }, [isInView]);

  // Effet de parallaxe
  const parallaxOffset = scrollY * 0.5;
  const fadeOpacity = Math.max(0, 1 - scrollY / 800);
  
  // Effet de clip pour une transition propre
  const clipPath = `inset(0 0 ${Math.min(100, scrollY / 8)}% 0)`;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/98 to-muted/30 pt-20 overflow-hidden z-40"
      style={{
        transform: `translateY(${parallaxOffset}px)`,
        opacity: fadeOpacity
      }}
    >
      {/* Masque de transition en bas */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-60 pointer-events-none"
        style={{
          opacity: Math.min(1, scrollY / 200)
        }}
      ></div>
      {/* Background avec vraies vagues */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-full" 
          viewBox="0 0 1440 900" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none"
        >
          {/* Première vague (arrière-plan) */}
          <path 
            fill="oklch(0.5316 0.1409 355.1999)" 
            fillOpacity="0.08" 
            d="M0,400L48,416C96,432,192,464,288,464C384,464,480,432,576,426.7C672,421,768,443,864,437.3C960,432,1056,400,1152,400C1248,400,1344,432,1392,448L1440,464L1440,900L1392,900C1344,900,1248,900,1152,900C1056,900,960,900,864,900C768,900,672,900,576,900C480,900,384,900,288,900C192,900,96,900,48,900L0,900Z"
            className="animate-pulse"
            style={{animationDuration: '8s'}}
          />
          
          {/* Deuxième vague (milieu) */}
          <path 
            fill="oklch(0.4607 0.1853 4.0994)" 
            fillOpacity="0.12" 
            d="M0,500L48,485.3C96,471,192,443,288,443.3C384,443,480,471,576,485.3C672,500,768,500,864,480C960,460,1056,420,1152,405.3C1248,391,1344,405,1392,412.7L1440,420L1440,900L1392,900C1344,900,1248,900,1152,900C1056,900,960,900,864,900C768,900,672,900,576,900C480,900,384,900,288,900C192,900,96,900,48,900L0,900Z"
            className="animate-pulse"
            style={{animationDuration: '6s', animationDelay: '1s'}}
          />
          
          {/* Troisième vague (premier plan) */}
          <path 
            fill="oklch(0.8696 0.0675 334.8991)" 
            fillOpacity="0.02" 
            d="M0,600L48,589.3C96,579,192,557,288,557.3C384,557,480,579,576,578.7C672,579,768,557,864,557.3C960,557,1056,579,1152,578.7C1248,579,1344,557,1392,546.7L1440,536L1440,900L1392,900C1344,900,1248,900,1152,900C1056,900,960,900,864,900C768,900,672,900,576,900C480,900,384,900,288,900C192,900,96,900,48,900L0,900Z"
            className="animate-pulse"
            style={{animationDuration: '10s', animationDelay: '2s'}}
          />
          
          {/* Vague d'accent supérieure */}
          <path 
            fill="oklch(0.5316 0.1409 355.1999)" 
            fillOpacity="0.06" 
            d="M0,200L48,213.3C96,227,192,253,288,253.3C384,253,480,227,576,213.3C672,200,768,200,864,216C960,232,1056,264,1152,274.7C1248,285,1344,275,1392,269.3L1440,264L1440,900L1392,900C1344,900,1248,900,1152,900C1056,900,960,900,864,900C768,900,672,900,576,900C480,900,384,900,288,900C192,900,96,900,48,900L0,900Z"
            opacity="0.5"
          />
        </svg>
        
        {/* Vagues du haut (inversées) */}
        <svg 
          className="absolute top-0 w-full h-1/2" 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none"
          style={{transform: 'rotate(180deg)'}}
        >
          <path 
            fill="oklch(0.4607 0.1853 4.0994)" 
            fillOpacity="0.04" 
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,101.3C960,96,1056,64,1152,64C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        {/* Éléments flottants subtils */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: '7s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-secondary/2 rounded-full blur-2xl animate-pulse" style={{animationDuration: '9s', animationDelay: '2s'}}></div>
      </div>
      
      {/* Hero Content */}
      <div 
        ref={ref}
        className="relative z-50 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        style={{
          transform: `translateY(${-scrollY * 0.3}px)`,
          clipPath: clipPath
        }}
      >
        {/* Colonne de gauche - Contenu textuel */}
        <MotionDiv className="space-y-6 text-left">
          {/* Badge Personnel */}
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              type: "spring" as const,
              bounce: 0.4
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover-lift"
          >
            🚀 Ouvert aux collaborations
          </MotionDiv>
          
          {/* Votre Nom & Expertise */}
          <MotionDiv className="space-y-4">
          {/* Nom avec effet machine à écrire */}
          <MotionH1 
            className="text-4xl md:text-6xl font-bold leading-tight min-h-[1.2em]"
            style={{ fontFamily: "'Comfortaa', sans-serif", fontWeight: 700, letterSpacing: '0.02em' }}
          >
            {showTypewriter ? (
              <TypewriterText
                text="HANTAN Hugues"
                speed={120}
                delay={0}
                startTyping={showTypewriter}
                className="text-gradient"
                showCursor={true}
                cursorClassName="text-primary"
                style={{ fontFamily: "'Comfortaa', sans-serif", fontWeight: 700, letterSpacing: '0.02em' }}
              />
            ) : (
              <span 
                className="text-gradient opacity-0"
                style={{ fontFamily: "'Comfortaa', sans-serif", fontWeight: 700, letterSpacing: '0.02em' }}
              >
                HANTAN Hugues
              </span>
            )}
          </MotionH1>

          {/* Titre avec slide in */}
          <MotionDiv 
            {...slideInFromBottom}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium"
          >
            Développeur IoT & Frontend Specialist
          </MotionDiv>

          {/* Description avec effet de défloutage */}
          <MotionP 
            initial={{ 
              opacity: 0, 
              filter: "blur(10px)",
              y: 20
            }}
            animate={showDescription ? { 
              opacity: 1, 
              filter: "blur(0px)",
              y: 0
            } : {
              opacity: 0, 
              filter: "blur(10px)",
              y: 20
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut" 
            }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Passionné par l'IoT et le développement d'interfaces modernes. Je maîtrise le backend embarqué (microcontrôleurs, capteurs, communication hardware), crée des expériences frontend fluides, et perfectionne mes compétences en backend web.
          </MotionP>
          </MotionDiv>

          {/* CTA Buttons */}
          <MotionDiv 
            initial={{ opacity: 0, y: 50 }}
            animate={showDescription ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4 pt-8"
          >
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            animate={showDescription ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button 
              size="lg" 
              className="gap-2 px-8 py-4 text-lg hover-lift shadow-glow"
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Voir mes projets <ArrowRight className="h-4 w-4" />
            </Button>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            animate={showDescription ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 px-8 py-4 text-lg hover-lift"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail className="h-5 w-5" /> Contactez-moi
            </Button>
          </MotionDiv>
        </MotionDiv>

        {/* Technologies & Compétences */}
        <MotionDiv 
          initial={{ opacity: 0, y: 30 }}
          animate={showDescription ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="pt-6"
        >
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={showDescription ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="text-center mb-4"
          >
            <p className="text-sm text-muted-foreground font-medium">Spécialisé dans</p>
          </MotionDiv>
          
          <MotionDiv className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              { name: "React/Next.js", delay: 1.8 },
              { name: "TypeScript", delay: 1.9 },
              { name: "Arduino/IoT", delay: 2.0 },
              { name: "Python", delay: 2.1 },
              { name: "Robotique", delay: 2.2 }
            ].map((tech, index) => (
              <MotionDiv
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={showDescription ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.5, delay: tech.delay }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-muted-foreground/20 text-muted-foreground text-sm font-medium hover:bg-muted/50 hover:border-primary/30 hover:text-primary transition-all duration-300 group"
              >
                <span className="text-base group-hover:scale-110 transition-transform duration-300">
                  {getTechIcon(tech.name)}
                </span>
                {tech.name}
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>
        </MotionDiv>

        {/* Colonne de droite - Image */}
        <MotionDiv 
          initial={{ opacity: 0, x: 80, y: 30, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            scale: 1 
          } : { 
            opacity: 0, 
            x: 80, 
            y: 30, 
            scale: 0.8 
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Formes de fond animées professionnelles */}
            <MotionDiv
              initial={{ opacity: 0, rotate: 0, scale: 1 }}
              animate={isInView ? { 
                opacity: [0, 0.7, 0.5], 
                rotate: [0, 2, 4, 2],
                scale: [1, 1.02, 1.04, 1.02]
              } : { opacity: 0, rotate: 0, scale: 1 }}
              transition={{ 
                duration: 8, 
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-primary/8 to-secondary/6 rounded-3xl"
            />
            <MotionDiv
              initial={{ opacity: 0, rotate: 0, scale: 1 }}
              animate={isInView ? { 
                opacity: [0, 0.5, 0.3], 
                rotate: [0, -1, -3, -1],
                scale: [1, 1.03, 1.06, 1.03]
              } : { opacity: 0, rotate: 0, scale: 1 }}
              transition={{ 
                duration: 10, 
                delay: 1.0,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-tr from-secondary/4 to-primary/4 rounded-3xl"
            />
            
            {/* Image principale */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}images/Adobe Express - file.png`}
                alt="HANTAN Hugues - Développeur Portfolio"
                className="w-80 h-96 md:w-96 md:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay gradient subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
            
            {/* Éléments décoratifs professionnels */}
            {/* Cercle 1 - Coin supérieur droit */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={isInView ? { 
                opacity: [0, 0.9, 0.5], 
                scale: [0, 1.2, 1], 
                rotate: [0, 180, 360] 
              } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 2, 
                delay: 1.0,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-blue-400/70 to-purple-500/30 rounded-full shadow-lg"
            />
            
            {/* Cercle 2 - Bas centre (déplacé pour éviter superposition) */}
            <MotionDiv
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={isInView ? { 
                opacity: [0, 0.7, 0.4], 
                x: [-20, 0, 10, 0], 
                y: [20, 0, -10, 0] 
              } : { opacity: 0, x: -20, y: 20 }}
              transition={{ 
                duration: 3, 
                delay: 1.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              className="absolute -bottom-3 left-1/4 w-4 h-4 bg-gradient-to-tr from-emerald-400/60 to-teal-500/25 rounded-full shadow-md"
            />
            
            {/* Cercle 3 - Côté gauche */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: [0, 0.6, 0.3], 
                scale: [0, 1.5, 0.8, 1] 
              } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 2.5, 
                delay: 2.0,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 -left-7 w-3 h-3 bg-gradient-to-bl from-orange-400/50 to-pink-500/20 rounded-full shadow-sm"
            />
            
            {/* Nouveau Cercle 4 - Côté droit milieu (plus petit) */}
            <MotionDiv
              initial={{ opacity: 0, y: -15, scale: 0 }}
              animate={isInView ? { 
                opacity: [0, 0.5, 0.2], 
                y: [-15, 0, 8, 0],
                scale: [0, 1.3, 0.9, 1.1] 
              } : { opacity: 0, y: -15, scale: 0 }}
              transition={{ 
                duration: 2.8, 
                delay: 2.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeInOut"
              }}
              className="absolute top-2/3 -right-6 w-2 h-2 bg-gradient-to-tr from-cyan-400/45 to-indigo-500/20 rounded-full shadow-sm"
            />
            
            {/* Nouveau Cercle 5 - Haut gauche (moyen) */}
            <MotionDiv
              initial={{ opacity: 0, x: 15, rotate: 0 }}
              animate={isInView ? { 
                opacity: [0, 0.6, 0.3], 
                x: [15, 0, -5, 0],
                rotate: [0, 90, 180, 270, 360] 
              } : { opacity: 0, x: 15, rotate: 0 }}
              transition={{ 
                duration: 4, 
                delay: 1.8,
                repeat: Infinity,
                repeatDelay: 7,
                ease: "easeInOut"
              }}
              className="absolute top-1/6 -left-4 w-3.5 h-3.5 bg-gradient-to-bl from-violet-400/55 to-rose-500/25 rounded-full shadow-md"
            />
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
