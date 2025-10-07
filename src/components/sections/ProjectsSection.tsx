import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter, Eye } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { MotionDiv, fadeInUp, staggerContainer, staggerItem } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
}

export const ProjectsSection = () => {
  const { ref, isInView } = useInView();
  
  // Mock data - sera remplacé par des données réelles
  const projects: Project[] = [
    {
      id: 1,
      title: "Plateforme E-Commerce",
      description: "Application complète avec panier, paiements et gestion des commandes",
      tags: ["React", "Node.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
      url: "#",
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Interface d'administration avec graphiques et métriques en temps réel",
      tags: ["Vue.js", "D3.js", "Firebase"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      url: "#",
    },
    {
      id: 3,
      title: "App Mobile Social",
      description: "Réseau social mobile avec chat en temps réel et partage de contenu",
      tags: ["React Native", "Socket.io", "MongoDB"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      url: "#",
    },
    {
      id: 4,
      title: "Site Vitrine Corporate",
      description: "Site web moderne et responsive pour une entreprise de conseil",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      url: "#",
    }
  ];

  // État pour les filtres
  const [selectedFilter, setSelectedFilter] = useState<string>("Tous");
  
  // Extraire toutes les technologies uniques
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  const filters = ["Tous", ...allTags];

  // Filtrer les projets
  const filteredProjects = selectedFilter === "Tous" 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedFilter));

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Mes dernières réalisations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des projets qui ont fait la différence pour mes clients
          </p>
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
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover-lift"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => {
                    // TODO: Ouvrir lightbox
                    console.log("Ouvrir lightbox pour:", project.title);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Voir en grand
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => setSelectedFilter(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full gap-2 hover-lift">
                  Découvrir le projet <ExternalLink className="h-4 w-4" />
                </Button>
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
      </div>
    </section>
  );
};
