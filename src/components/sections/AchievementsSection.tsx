import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Users, Award, Loader2, AlertCircle } from "lucide-react";
import { MotionDiv, MotionSection, staggerContainer, staggerItem } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";
import { API_ENDPOINTS, fetchAPI } from "@/config/api";

// Types
interface Organization {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  description: string;
  url: string;
}

interface Achievement {
  id: number;
  title: string;
  position: string;
  year: string;
  type: string;
  icon: string;
  description: string;
  organization: string;
  countries?: string[];
  links?: Array<{
    label: string;
    url: string;
    type: string;
  }>;
  project_name?: string;
}

export const AchievementsSection = () => {
  const { ref, isInView } = useInView();
  
  // États
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Charger organisations et achievements en parallèle
        const [orgsResponse, achievementsResponse] = await Promise.all([
          fetchAPI<{ success: boolean; data: Organization[] }>(API_ENDPOINTS.organizations),
          fetchAPI<{ success: boolean; data: Achievement[] }>(API_ENDPOINTS.achievements)
        ]);
        
        setOrganizations(orgsResponse.data);
        setAchievements(achievementsResponse.data);
      } catch (err) {
        console.error("Erreur chargement achievements:", err);
        setError("Impossible de charger les achievements.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <MotionSection 
      ref={ref}
      id="achievements" 
      className="py-24 px-6 bg-background"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Achievements & <span className="text-gradient">Collaborations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mes réalisations, compétitions remportées et organisations dans lesquelles j'ai contribué
          </p>
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des achievements...</p>
          </div>
        )}

        {/* Erreur */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-destructive text-lg">{error}</p>
          </div>
        )}

        {/* Contenu */}
        {!loading && !error && (
          <MotionDiv
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="space-y-16"
          >
            {/* Section Compétitions & Trophées */}
            {achievements.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Trophy className="h-8 w-8 text-primary" />
                  <h3 className="text-3xl font-bold">Compétitions & Trophées</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <MotionDiv
                      key={achievement.id}
                      variants={staggerItem}
                      className="group"
                    >
                      <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover-lift border-primary/20 hover:border-primary/40">
                        <div className="flex items-start gap-4">
                          <div className="text-5xl">{achievement.icon}</div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                  {achievement.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.organization} • {achievement.year}
                                </p>
                              </div>
                              <Badge className="bg-primary/20 text-primary border-primary shrink-0">
                                <Award className="h-3 w-3 mr-1" />
                                {achievement.position}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground leading-relaxed">
                              {achievement.description}
                            </p>
                            
                            {achievement.countries && achievement.countries.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {achievement.countries.map((country) => (
                                  <Badge key={country} variant="outline" className="text-xs">
                                    🌍 {country}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {achievement.project_name && (
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="secondary">
                                  Projet : {achievement.project_name}
                                </Badge>
                              </div>
                            )}
                            
                            {achievement.links && achievement.links.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {achievement.links.map((link, index) => (
                                  <Button 
                                    key={index}
                                    variant={link.type === 'demo' ? 'default' : 'outline'}
                                    size="sm"
                                    className="gap-2 hover-lift"
                                    onClick={() => window.open(link.url, '_blank')}
                                  >
                                    {link.type === 'demo' && '🚀'}
                                    {link.type === 'github' && '💻'}
                                    {link.type === 'documentation' && '📚'}
                                    {link.label} <ExternalLink className="h-3 w-3" />
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}

            {/* Section Organisations */}
            {organizations.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-3xl font-bold">Organisations & Collaborations</h3>
                </div>
                
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {organizations.map((org) => (
                    <MotionDiv
                      key={org.id}
                      variants={staggerItem}
                      className="group"
                    >
                      <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover-lift border-primary/20 hover:border-primary/40">
                        <div className="space-y-4">
                          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-muted group-hover:scale-110 transition-transform duration-300">
                            <img 
                              src={org.avatar_url} 
                              alt={org.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {org.name}
                            </h4>
                            {org.description && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {org.description}
                              </p>
                            )}
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full gap-2 hover-lift"
                            onClick={() => window.open(org.url, '_blank')}
                          >
                            Voir sur GitHub <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </Card>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}

            {/* Message si aucune donnée */}
            {achievements.length === 0 && organizations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun achievement disponible pour le moment
                </p>
              </div>
            )}
          </MotionDiv>
        )}
      </div>
    </MotionSection>
  );
};
