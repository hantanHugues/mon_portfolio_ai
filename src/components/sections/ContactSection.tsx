import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Youtube, Twitter, Instagram } from "lucide-react";
import { MotionDiv, MotionH2 } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

export const ContactSection = () => {
  const { ref, isInView } = useInView();

  const socialLinks = [
    { 
      icon: Github, 
      name: "GitHub", 
      url: "https://github.com/hantanHugues", 
      description: "Mes projets open-source",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    { 
      icon: Linkedin, 
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/agossou-fred-hugues-hantan-35992431b", 
      description: "Mon réseau professionnel",
      color: "hover:text-blue-600"
    },
    { 
      icon: Youtube, 
      name: "YouTube", 
      url: "https://www.youtube.com/@AgossouFredHuguesHANTAN", 
      description: "Tutoriels IoT & Robotique",
      color: "hover:text-red-600"
    },
    { 
      icon: Twitter, 
      name: "Twitter", 
      url: "https://x.com/Ashlynx_005", 
      description: "Actualités tech & projets",
      color: "hover:text-blue-400"
    },
    { 
      icon: Instagram, 
      name: "Instagram", 
      url: "https://www.instagram.com/ashlanvonnewgat", 
      description: "Behind the scenes",
      color: "hover:text-pink-600"
    },
    { 
      icon: Mail, 
      name: "Email", 
      url: "mailto:ashlanvonnewgat@gmail.com", 
      description: "Contact direct",
      color: "hover:text-green-600"
    }
  ];

  return (
    <section ref={ref} id="contact" className="py-24 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <MotionH2 className="text-4xl md:text-5xl font-bold mb-6">
            Connectons-nous & <span className="text-gradient">Échangeons</span> !
          </MotionH2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionné par l'IoT et la robotique, je partage régulièrement mes projets, 
            découvertes et tutoriels. Suivez-moi pour ne rien manquer !
          </p>
        </MotionDiv>
        
        {/* Réseaux sociaux */}
        <MotionDiv 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {socialLinks.map((social, index) => (
            <MotionDiv
              key={social.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg ${social.color}`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <social.icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {social.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {social.description}
                    </p>
                  </div>
                </div>
              </a>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* CTA principal */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-8"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Une question sur l'IoT ou la robotique ? Envie de collaborer ?
          </p>
          <Button size="lg" className="gap-2 px-8 py-4 text-lg hover-lift shadow-glow">
            <Mail className="h-5 w-5" /> Envoyons un message
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};
