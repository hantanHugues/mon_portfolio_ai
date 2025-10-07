import { MotionDiv, MotionSection, MotionH1, MotionH2, MotionP, staggerContainer, staggerItem, fadeInUp } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";

export default function Remerciements() {
  const { ref: heroRef, isInView: heroInView } = useInView();
  const { ref: sectionsRef, isInView: sectionsInView } = useInView();
  const { ref: messageRef, isInView: messageInView } = useInView();

  const remerciements = [
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Ma Famille",
      description: "Pour leur soutien inconditionnel, leur patience et leurs encouragements constants dans mon parcours de développeur.",
      gradient: "from-primary/15 to-secondary/10"
    },
    {
      icon: "👥",
      title: "La Communauté Dev",
      description: "À tous les développeurs qui partagent leur savoir en open-source et créent des ressources incroyables.",
      gradient: "from-secondary/15 to-primary/10"
    },
    {
      icon: "🤝",
      title: "Mes Collègues & Amis",
      description: "À mes collègues et amis développeurs avec qui j'ai beaucoup partagé, appris et grandi professionnellement.",
      gradient: "from-primary/10 to-secondary/15"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <MotionSection
        ref={heroRef}
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/3 via-transparent to-muted/3"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <MotionH1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Mes <span className="text-gradient">Remerciements</span>
          </MotionH1>
          
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Aucun parcours ne se fait seul. Je tiens à exprimer ma gratitude envers 
            toutes les personnes qui ont contribué à façonner le développeur que je suis aujourd'hui.
          </MotionP>
        </div>
      </MotionSection>

      {/* Section Remerciements */}
      <MotionSection
        ref={sectionsRef}
        className="py-20 px-6 relative"
        initial={{ opacity: 0 }}
        animate={sectionsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <MotionDiv 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={sectionsInView ? "animate" : "initial"}
          >
            {remerciements.map((item, index) => (
              <MotionDiv
                key={item.title}
                variants={staggerItem}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="p-8 h-full border-primary/20 hover:border-primary/40 transition-all duration-300 group hover-lift">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Message Personnel */}
      <MotionSection
        ref={messageRef}
        className="py-20 px-6 relative"
        initial={{ opacity: 0 }}
        animate={messageInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={messageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🙏</span>
              </div>
              
              <MotionH2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold"
              >
                Un Grand <span className="text-gradient">Merci</span>
              </MotionH2>
              
              <blockquote className="text-xl text-muted-foreground italic leading-relaxed">
                "Le succès n'est jamais le fruit d'un effort solitaire. Chaque ligne de code que j'écris 
                porte en elle l'empreinte de tous ceux qui m'ont accompagné, inspiré et soutenu. 
                Cette gratitude me motive à continuer d'apprendre, de créer et de partager à mon tour."
              </blockquote>
              
              <div className="pt-4">
                <p className="text-primary font-semibold text-lg">
                  — HANTAN Agossou Fred Hugues
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Expert IoT & Développeur Full-Stack
                </p>
              </div>
            </MotionDiv>
          </Card>
        </div>
      </MotionSection>

      <Footer />
    </div>
  );
}
