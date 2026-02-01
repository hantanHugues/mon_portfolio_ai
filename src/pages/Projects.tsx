import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter, Eye, Loader2, AlertCircle, Star, GitFork } from "lucide-react";
import { MotionDiv, staggerContainer, staggerItem } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";
import { API_ENDPOINTS, fetchAPI } from "@/config/api";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";

// Types
interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  is_featured?: boolean;
  is_portfolio?: boolean;
}

export default function ProjectsPage() {
  const { ref, isInView } = useInView();
  
  // États
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("Tous");

  // Charger TOUS les projets
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer tous les projets (pas de filtre)
        const response = await fetchAPI<{ success: boolean; data: Project[] }>(
          API_ENDPOINTS.projects
        );
        
        setProjects(response.data);
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
        .filter(p => p.language)
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tous mes <span className="text-gradient">Projets</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Découvrez l'ensemble de mes projets open-source et contributions sur GitHub
            </p>
            
            {/* Badge d'information */}
            <div className="flex justify-center">
              <Card className="inline-flex items-center gap-3 px-6 py-4 bg-primary/5 border-primary/20">
                <div className="text-3xl">🧪</div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Portfolio d'apprentissage</p>
                  <p className="text-sm text-muted-foreground">
                    Beaucoup de prototypage et de tests - j'explore, j'apprends et j'expérimente sur un peu de tout !
                  </p>
                </div>
              </Card>
            </div>
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
              {/* Statistiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Projets totaux</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">
                    {projects.filter(p => p.is_featured).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Mis en avant</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">
                    {projects.reduce((acc, p) => acc + p.stargazers_count, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Stars totales</p>
                </Card>
                <Card className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">
                    {new Set(projects.map(p => p.language).filter(Boolean)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Langages</p>
                </Card>
              </div>

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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      
                      {/* Badges en haut */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                          {project.language || "Code"}
                        </Badge>
                        {project.is_featured && (
                          <Badge className="bg-primary/80 backdrop-blur">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>
                      
                      {/* Stats */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {project.stargazers_count > 0 && (
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur gap-1">
                            <Star className="h-3 w-3" /> {project.stargazers_count}
                          </Badge>
                        )}
                        {project.forks_count > 0 && (
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur gap-1">
                            <GitFork className="h-3 w-3" /> {project.forks_count}
                          </Badge>
                        )}
                      </div>
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
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
