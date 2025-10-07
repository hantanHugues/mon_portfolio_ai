import { Card } from "@/components/ui/card";
import { MotionDiv, MotionSection, MotionH2, staggerContainer, staggerItem, fadeInUp } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

export const ServicesSection = () => {
  const { ref, isInView } = useInView();
  
  // Section transformée pour montrer l'expertise IoT/Robotique

  const expertiseAreas = [
    {
      icon: "💻",
      title: "Développement Web & Mobile", 
      description: "Applications React/Next.js, sites e-commerce, plateformes SaaS et interfaces utilisateur modernes"
    },
    {
      icon: "📡", 
      title: "Solutions IoT & Connectées",
      description: "Capteurs intelligents, réseaux IoT, domotique et plateformes de monitoring en temps réel"
    },
    {
      icon: "🤖",
      title: "Robotique & Systèmes Embarqués",
      description: "Automatisation industrielle, prototypes robotiques et intégration hardware/software"
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
            Mon Expertise Technique
          </MotionH2>
          <MotionDiv 
            variants={staggerItem}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Passionné par l'innovation technologique, je partage mes connaissances 
            et créations dans ces domaines d'expertise
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
                  <h3 className="text-xl font-semibold text-foreground">{area.title}</h3>
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
