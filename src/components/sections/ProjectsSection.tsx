import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter, Eye, Loader2, AlertCircle } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { MotionDiv, fadeInUp, staggerContainer, staggerItem } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";
import { API_ENDPOINTS, fetchAPI } from "@/config/api";

// Types
interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  language: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  is_featured?: boolean;
  is_portfolio?: boolean;
}

export const ProjectsSection = () => {
  const { ref, isInView } = useInView();
  
  // États
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("Tous");

  // Charger les projets depuis l'API (seulement les 4 featured pour la page d'accueil)
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer seulement les projets marqués "featured"
        const response = await fetchAPI<{ success: boolean; data: Project[] }>(
          `${API_ENDPOINTS.projects}?filter=featured`
        );
        
        // Limiter à 6 projets maximum pour la page d'accueil
        setProjects(response.data.slice(0, 6));
      } catch (err) {
        console.error("Erreur chargement projets:", err);
        setError("Impossible de charger les projets. Vérifiez votre connexion.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  
  // Extraire toutes les technologies uniques
  const allTags = Array.from(
    new Set(
      projects
        .filter(p => p.language) // Filtrer les projets sans langage
        .map(p => p.language)
        .concat(projects.flatMap(p => p.topics || []))
    )
  ).sort();
  
  const filters = ["Tous", ...allTags];

  // Filtrer les projets
  const filteredProjects = selectedFilter === "Tous" 
    ? projects 
    : projects.filter(project => 
        project.language === selectedFilter || 
        project.topics?.includes(selectedFilter)
      );

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Mes dernières réalisations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mes projets open-source directement depuis GitHub
          </p>
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des projets...</p>
          </div>
        )}

        {/* Erreur */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-destructive text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        )}

        {/* Contenu des projets */}
        {!loading && !error && (
          <>
            {/* Filtres */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filtrer par technologie :</span>
              </div>
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="hover-lift"
                >
                  {filter}
                </Button>
              ))}
            </div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover-lift flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {project.language === "JavaScript" && "JS"}
                    {project.language === "TypeScript" && "TS"}
                    {project.language === "Python" && "🐍"}
                    {project.language === "Java" && "☕"}
                    {!["JavaScript", "TypeScript", "Python", "Java"].includes(project.language || "") && "📦"}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                    {project.language || "Code"}
                  </Badge>
                </div>
                {project.stargazers_count > 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur gap-1">
                      ⭐ {project.stargazers_count}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold line-clamp-2">{project.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                  {project.description || "Pas de description disponible"}
                </p>
                
                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.topics.slice(0, 4).map((topic) => (
                      <Badge 
                        key={topic} 
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={() => setSelectedFilter(topic)}
                      >
                        {topic}
                      </Badge>
                    ))}
                    {project.topics.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.topics.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2 hover-lift"
                    onClick={() => window.open(project.html_url, '_blank')}
                  >
                    Voir sur GitHub <ExternalLink className="h-4 w-4" />
                  </Button>
                  {project.homepage && (
                    <Button
                      variant="default"
                      size="icon"
                      className="hover-lift"
                      onClick={() => window.open(project.homepage!, '_blank')}
                      title="Voir la démo"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun projet trouvé pour "{selectedFilter}"
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedFilter("Tous")}
              className="mt-4"
            >
              Voir tous les projets
            </Button>
          </div>
        )}

        {/* Bouton voir tous les projets */}
        {!loading && !error && projects.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="gap-2 hover-lift"
              onClick={() => window.location.href = '/projects'}
            >
              Voir tous mes projets ({projects.length})
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )}
          </>
        )}
      </div>
    </section>
  );
};
