import { Card } from "@/components/ui/card";
import { MotionDiv, MotionSection, MotionH2, staggerContainer, staggerItem, fadeInUp } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

export const HobbiesSection = () => {
  const { ref, isInView } = useInView();

  const hobbies = [
    {
      icon: "💻",
      title: "Coding Personnel",
      description: "Projets open-source, expérimentations avec de nouvelles technologies et contributions à la communauté dev",
      gradient: "from-primary via-blue-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-primary/8 via-blue-500/6 to-cyan-500/10",
      glowColor: "shadow-primary/25",
      stats: "50+ repos GitHub"
    },
    {
      icon: "🎵", 
      title: "Musique",
      description: "Exploration sonore et créativité musicale - la musique inspire souvent mes meilleures idées techniques",
      gradient: "from-secondary via-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-secondary/8 via-purple-500/6 to-pink-500/10",
      glowColor: "shadow-secondary/25",
      stats: "Créativité ∞"
    },
    {
      icon: "🎮",
      title: "Game Development",
      description: "Création de jeux vidéos indie et prototypes interactifs pendant mon temps libre",
      gradient: "from-primary/90 via-emerald-500 to-green-500",
      bgPattern: "bg-gradient-to-br from-primary/6 via-emerald-500/6 to-green-500/10",
      glowColor: "shadow-emerald-500/25",
      stats: "Unity & Godot"
    },
    {
      icon: "🎌",
      title: "Culture Anime",
      description: "Passionné d'animation japonaise - source d'inspiration pour l'UI/UX et la narration interactive",
      gradient: "from-secondary/90 via-orange-500 to-amber-500",
      bgPattern: "bg-gradient-to-br from-secondary/6 via-orange-500/6 to-amber-500/10",
      glowColor: "shadow-orange-500/25",
      stats: "1000+ épisodes"
    }
  ];

  return (
    <MotionSection
      ref={ref}
      id="hobbies" 
      className="py-20 px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/5"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <MotionDiv 
          className="text-center mb-12"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <MotionH2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Passions & <span className="text-gradient">Créativité</span>
          </MotionH2>
          <MotionDiv 
            variants={staggerItem}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Au-delà du code professionnel, ces passions nourrissent ma créativité 
            et inspirent mes projets techniques
          </MotionDiv>
        </MotionDiv>

        <MotionDiv 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {hobbies.map((hobby, index) => (
            <MotionDiv
              key={hobby.title}
              variants={staggerItem}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group"
            >
              <div 
                className="relative p-6 rounded-2xl border border-border/30 backdrop-blur-sm transition-all duration-500 hover:border-transparent overflow-hidden h-full group-hover:shadow-2xl"
                style={{
                  background: 'transparent',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              >
                {/* Background coloré au hover uniquement */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      hobby.title === 'Coding Personnel' ? 'rgb(59 130 246 / 0.15)' :
                      hobby.title === 'Musique' ? 'rgb(168 85 247 / 0.15)' :
                      hobby.title === 'Game Development' ? 'rgb(16 185 129 / 0.15)' :
                      hobby.title === 'Culture Anime' ? 'rgb(249 115 22 / 0.15)' :
                      'rgb(16 185 129 / 0.15)'
                    }, ${
                      hobby.title === 'Coding Personnel' ? 'rgb(6 182 212 / 0.18)' :
                      hobby.title === 'Musique' ? 'rgb(236 72 153 / 0.18)' :
                      hobby.title === 'Game Development' ? 'rgb(34 197 94 / 0.18)' :
                      hobby.title === 'Culture Anime' ? 'rgb(245 158 11 / 0.18)' :
                      'rgb(34 197 94 / 0.18)'
                    })`,
                    boxShadow: `0 25px 50px -12px ${
                      hobby.title === 'Coding Personnel' ? 'rgb(59 130 246 / 0.4)' :
                      hobby.title === 'Musique' ? 'rgb(168 85 247 / 0.4)' :
                      hobby.title === 'Game Development' ? 'rgb(16 185 129 / 0.4)' :
                      hobby.title === 'Culture Anime' ? 'rgb(249 115 22 / 0.4)' :
                      'rgb(16 185 129 / 0.4)'
                    }`
                  }}
                ></div>
                
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        hobby.title === 'Coding Personnel' ? 'rgb(59 130 246)' :
                        hobby.title === 'Musique' ? 'rgb(168 85 247)' :
                        hobby.title === 'Game Development' ? 'rgb(16 185 129)' :
                        hobby.title === 'Culture Anime' ? 'rgb(249 115 22)' :
                        'rgb(16 185 129)'
                      }, ${
                        hobby.title === 'Coding Personnel' ? 'rgb(6 182 212)' :
                        hobby.title === 'Musique' ? 'rgb(236 72 153)' :
                        hobby.title === 'Game Development' ? 'rgb(34 197 94)' :
                        hobby.title === 'Culture Anime' ? 'rgb(245 158 11)' :
                        'rgb(34 197 94)'
                      })`
                    }}
                  ></div>
                  <div 
                    className="absolute top-0 left-0 w-full h-1"
                    style={{
                      background: `linear-gradient(to right, ${
                        hobby.title === 'Coding Personnel' ? 'rgb(59 130 246)' :
                        hobby.title === 'Musique' ? 'rgb(168 85 247)' :
                        hobby.title === 'Game Development' ? 'rgb(16 185 129)' :
                        hobby.title === 'Culture Anime' ? 'rgb(249 115 22)' :
                        'rgb(16 185 129)'
                      }, ${
                        hobby.title === 'Coding Personnel' ? 'rgb(6 182 212)' :
                        hobby.title === 'Musique' ? 'rgb(236 72 153)' :
                        hobby.title === 'Game Development' ? 'rgb(34 197 94)' :
                        hobby.title === 'Culture Anime' ? 'rgb(245 158 11)' :
                        'rgb(34 197 94)'
                      })`
                    }}
                  ></div>
                </div>
                
                {/* Particules flottantes - visibles uniquement au hover */}
                <div 
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-90 group-hover:animate-pulse transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, ${
                      hobby.title === 'Coding Personnel' ? 'rgb(59 130 246)' :
                      hobby.title === 'Musique' ? 'rgb(168 85 247)' :
                      hobby.title === 'Game Development' ? 'rgb(16 185 129)' :
                      hobby.title === 'Culture Anime' ? 'rgb(249 115 22)' :
                      'rgb(16 185 129)'
                    }, ${
                      hobby.title === 'Coding Personnel' ? 'rgb(6 182 212)' :
                      hobby.title === 'Musique' ? 'rgb(236 72 153)' :
                      hobby.title === 'Game Development' ? 'rgb(34 197 94)' :
                      hobby.title === 'Culture Anime' ? 'rgb(245 158 11)' :
                      'rgb(34 197 94)'
                    })`
                  }}
                ></div>
                <div 
                  className="absolute bottom-6 left-4 w-1 h-1 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-bounce transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, ${
                      hobby.title === 'Coding Personnel' ? 'rgb(59 130 246)' :
                      hobby.title === 'Musique' ? 'rgb(168 85 247)' :
                      hobby.title === 'Game Development' ? 'rgb(16 185 129)' :
                      hobby.title === 'Culture Anime' ? 'rgb(249 115 22)' :
                      'rgb(16 185 129)'
                    }, ${
                      hobby.title === 'Coding Personnel' ? 'rgb(6 182 212)' :
                      hobby.title === 'Musique' ? 'rgb(236 72 153)' :
                      hobby.title === 'Game Development' ? 'rgb(34 197 94)' :
                      hobby.title === 'Culture Anime' ? 'rgb(245 158 11)' :
                      'rgb(34 197 94)'
                    })`
                  }}
                ></div>
                
                <div className="relative z-10 space-y-4 text-center">
                  {/* Icône avec effet 3D */}
                  <MotionDiv 
                    className="relative mx-auto w-16 h-16 flex items-center justify-center"
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 15,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to bottom right, ${
                          hobby.title === 'Coding Personnel' ? 'rgb(59 130 246)' :
                          hobby.title === 'Musique' ? 'rgb(168 85 247)' :
                          hobby.title === 'Game Development' ? 'rgb(16 185 129)' :
                          hobby.title === 'Culture Anime' ? 'rgb(249 115 22)' :
                          'rgb(16 185 129)'
                        }, ${
                          hobby.title === 'Coding Personnel' ? 'rgb(6 182 212)' :
                          hobby.title === 'Musique' ? 'rgb(236 72 153)' :
                          hobby.title === 'Game Development' ? 'rgb(34 197 94)' :
                          hobby.title === 'Culture Anime' ? 'rgb(245 158 11)' :
                          'rgb(34 197 94)'
                        })`
                      }}
                    ></div>
                    <div className="relative w-14 h-14 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                      <span className="text-2xl filter drop-shadow-lg">{hobby.icon}</span>
                    </div>
                  </MotionDiv>

                  {/* Badge stats */}
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-white text-xs font-medium shadow-lg"
                    style={{
                      background: `linear-gradient(to right, ${
                        hobby.title === 'Coding Personnel' ? 'rgb(59 130 246)' :
                        hobby.title === 'Musique' ? 'rgb(168 85 247)' :
                        hobby.title === 'Game Development' ? 'rgb(16 185 129)' :
                        hobby.title === 'Culture Anime' ? 'rgb(249 115 22)' :
                        'rgb(16 185 129)'
                      }, ${
                        hobby.title === 'Coding Personnel' ? 'rgb(6 182 212)' :
                        hobby.title === 'Musique' ? 'rgb(236 72 153)' :
                        hobby.title === 'Game Development' ? 'rgb(34 197 94)' :
                        hobby.title === 'Culture Anime' ? 'rgb(245 158 11)' :
                        'rgb(34 197 94)'
                      })`
                    }}
                  >
                    {hobby.stats}
                  </div>

                  {/* Contenu */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${hobby.gradient} group-hover:bg-clip-text transition-all duration-300">
                      {hobby.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {hobby.description}
                    </p>
                  </div>

                  {/* Indicateur interactif */}
                  <div className="flex justify-center pt-2">
                    <div 
                      className="w-8 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{
                        background: `linear-gradient(to right, ${
                          hobby.gradient.includes('primary') ? 'hsl(var(--primary))' :
                          hobby.gradient.includes('blue') ? 'rgb(59 130 246)' :
                          hobby.gradient.includes('purple') ? 'rgb(168 85 247)' :
                          hobby.gradient.includes('emerald') ? 'rgb(16 185 129)' :
                          'rgb(249 115 22)'
                        }, ${
                          hobby.gradient.includes('cyan') ? 'rgb(6 182 212)' :
                          hobby.gradient.includes('pink') ? 'rgb(236 72 153)' :
                          hobby.gradient.includes('green') ? 'rgb(34 197 94)' :
                          'rgb(245 158 11)'
                        })`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Citation inspirante */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-border/30"
        >
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            "La créativité naît de la diversité des expériences. 
            Chaque passion enrichit ma vision technique."
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};
