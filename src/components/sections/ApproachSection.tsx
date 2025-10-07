import { Card } from "@/components/ui/card";
import { MotionDiv, MotionSection, MotionH2, staggerContainer, staggerItem, fadeInUp } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

export const ApproachSection = () => {
  const { ref, isInView } = useInView();

  return (
    <MotionSection 
      ref={ref}
      id="approach" 
      className="py-24 px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/3 via-transparent to-muted/3"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionDiv 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <MotionH2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ma Philosophie de <span className="text-gradient">Développement</span>
          </MotionH2>
          <MotionDiv 
            variants={staggerItem}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            L'innovation naît de la curiosité, la qualité de la passion, 
            et l'excellence de l'apprentissage continu
          </MotionDiv>
        </MotionDiv>

        <MotionDiv 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <MotionDiv variants={staggerItem}>
            <Card className="p-8 text-center hover-lift h-full border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="text-xl font-semibold">Build First, Buy Later</h3>
                <p className="text-muted-foreground">
                  Si j'ai besoin d'un outil, je le développe d'abord moi-même. C'est là que naît l'innovation véritable.
                </p>
              </div>
            </Card>
          </MotionDiv>

          <MotionDiv variants={staggerItem}>
            <Card className="p-8 text-center hover-lift h-full border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold">Passion & Excellence</h3>
                <p className="text-muted-foreground">
                  Aimer ce que l'on fait permet de le faire bien. La passion est le moteur de la qualité et de l'innovation.
                </p>
              </div>
            </Card>
          </MotionDiv>

          <MotionDiv variants={staggerItem}>
            <Card className="p-8 text-center hover-lift h-full border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold">Innovation Continue</h3>
                <p className="text-muted-foreground">
                  Expérimenter, prototyper et itérer pour transformer les idées en réalités technologiques.
                </p>
              </div>
            </Card>
          </MotionDiv>
        </MotionDiv>

        {/* Section Méthode de Travail */}
        <MotionDiv 
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Ma Méthode de <span className="text-gradient">Création</span>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <MotionDiv 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center mx-auto font-bold shadow-lg">
                🔍
              </div>
              <h4 className="font-semibold">Exploration</h4>
              <p className="text-sm text-muted-foreground">Recherche de technologies et analyse des possibilités</p>
            </MotionDiv>
            <MotionDiv 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center mx-auto font-bold shadow-lg">
                🎨
              </div>
              <h4 className="font-semibold">Prototypage</h4>
              <p className="text-sm text-muted-foreground">Création de POC et tests d'architecture</p>
            </MotionDiv>
            <MotionDiv 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center mx-auto font-bold shadow-lg">
                ⚡
              </div>
              <h4 className="font-semibold">Implémentation</h4>
              <p className="text-sm text-muted-foreground">Développement itératif avec tests continus</p>
            </MotionDiv>
            <MotionDiv 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center mx-auto font-bold shadow-lg">
                🚀
              </div>
              <h4 className="font-semibold">Optimisation</h4>
              <p className="text-sm text-muted-foreground">Peaufinage des performances et documentation</p>
            </MotionDiv>
          </div>
        </MotionDiv>

        {/* Citation personnelle */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mt-16 pt-12 border-t border-border/30"
        >
          <blockquote className="text-2xl font-medium text-muted-foreground italic max-w-4xl mx-auto">
            "Pourquoi chercher ailleurs ce que je peux créer moi-même ? 
            L'innovation commence par oser construire ses propres outils."
          </blockquote>
          <p className="text-primary font-semibold mt-4">— HANTAN Hugues</p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};
