import { Card } from "@/components/ui/card";
import { MotionDiv, MotionSection, MotionH2, staggerContainer, staggerItem, fadeInUp } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

export const ServicesSection = () => {
  const { ref, isInView } = useInView();
  
  // Section transformée pour montrer l'expertise IoT/Robotique

  const expertiseAreas = [
    {
      icon: "�", 
      title: "IoT & Backend Embarqué",
      description: "Capteurs intelligents, microcontrôleurs (Arduino, ESP32), communication hardware/software, réseaux IoT et intégration de systèmes connectés.",
      level: "Expert"
    },
    {
      icon: "💻",
      title: "Développement Frontend", 
      description: "Applications React/Next.js modernes, interfaces utilisateur fluides, expériences web responsive et dashboards de monitoring IoT.",
      level: "Avancé"
    },
    {
      icon: "🤖",
      title: "Robotique & Backend Web",
      description: "Prototypes robotiques, systèmes embarqués intelligents. Backend web (APIs REST, bases de données) en perfectionnement.",
      level: "Compétent"
    }
  ];

  return (
    <MotionSection
      ref={ref}
      id="services" 
      className="py-24 px-6 relative overflow-hidden z-10"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Effet de transition subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
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
            Mes Domaines d'<span className="text-gradient">Expertise</span>
          </MotionH2>
          <MotionDiv 
            variants={staggerItem}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            De l'IoT au Frontend, je construis des solutions connectées et des interfaces engageantes. 
            Toujours en apprentissage pour devenir un développeur Full-Stack complet.
          </MotionDiv>
        </MotionDiv>

        <MotionDiv 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {expertiseAreas.map((area, index) => (
            <MotionDiv
              key={area.title}
              variants={staggerItem}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="p-8 text-center hover-lift h-full border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="space-y-4">
                  <MotionDiv 
                    className="w-16 h-16 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <span className="text-3xl">{area.icon}</span>
                  </MotionDiv>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{area.title}</h3>
                  </div>
                  {area.level && (
                    <div className="mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        area.level === 'Expert' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                        area.level === 'Avancé' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                        area.level === 'Compétent' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                        'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {area.level}
                      </span>
                    </div>
                  )}
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
};
