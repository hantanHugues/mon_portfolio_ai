import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Eye, Settings, Search, Filter, Sparkles, Code, Globe, Github, Star, Award, User, Palette } from "lucide-react";
import { useState, useMemo } from "react";

const CVGenerator = () => {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([1, 2]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([1, 2, 3, 4]);
  const [cvTitle, setCvTitle] = useState("CV Développeur Full-Stack - React & Node.js");
  const [targetJob, setTargetJob] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("moderne");
  const [isAIOptimizing, setIsAIOptimizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");

  // Données des projets
  const projects = [
    {
      id: 1,
      title: "Plateforme E-Commerce",
      shortDescription: "E-commerce moderne avec paiements intégrés",
      description: "Application complète avec panier, paiements Stripe et gestion des commandes. Interface moderne avec React, backend robuste Node.js et base de données PostgreSQL optimisée.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript"],
      type: "Full-Stack",
      status: "Production",
      url: "https://ecommerce-demo.com",
      github: "https://github.com/hantan/ecommerce-platform",
      featured: true,
      impact: "Augmentation de 40% des ventes en ligne",
      metrics: "15k+ utilisateurs, 95% uptime"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      shortDescription: "Dashboard temps réel avec analytics avancés",
      description: "Interface de visualisation de données en temps réel avec graphiques interactifs D3.js. Système de monitoring avancé avec WebSockets pour les mises à jour live.",
      tags: ["TypeScript", "D3.js", "Tailwind", "WebSocket", "Chart.js"],
      type: "Frontend",
      status: "Production",
      url: "https://analytics-dashboard.com",
      github: "https://github.com/hantan/analytics-dashboard",
      featured: false,
      impact: "Réduction de 60% du temps d'analyse",
      metrics: "500+ dashboards créés, 2s temps de chargement"
    },
    {
      id: 3,
      title: "API REST Documentation",
      shortDescription: "Documentation automatique d'APIs",
      description: "Système de documentation automatique pour APIs REST avec génération de schémas OpenAPI et interface Swagger interactive.",
      tags: ["Node.js", "Express", "Swagger", "OpenAPI"],
      type: "Backend",
      status: "Development",
      url: null,
      github: "https://github.com/hantan/api-docs-generator",
      featured: false,
      impact: "Gain de 80% de temps en documentation",
      metrics: "50+ APIs documentées automatiquement"
    },
  ];

  // Données enrichies des compétences
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { id: 1, name: "React", level: 90, experience: "4 ans", trend: "+15", projects: 12, category: "Frontend" },
        { id: 2, name: "TypeScript", level: 85, experience: "3 ans", trend: "+20", projects: 8, category: "Frontend" },
        { id: 3, name: "Tailwind CSS", level: 80, experience: "2 ans", trend: "+10", projects: 15, category: "Frontend" },
        { id: 4, name: "Vue.js", level: 70, experience: "2 ans", trend: "+5", projects: 4, category: "Frontend" },
        { id: 5, name: "Next.js", level: 75, experience: "2 ans", trend: "+25", projects: 6, category: "Frontend" }
      ]
    },
    {
      category: "Backend",
      skills: [
        { id: 6, name: "Node.js", level: 88, experience: "4 ans", trend: "+12", projects: 10, category: "Backend" },
        { id: 7, name: "Express", level: 85, experience: "3 ans", trend: "+8", projects: 9, category: "Backend" },
        { id: 8, name: "PostgreSQL", level: 75, experience: "3 ans", trend: "+15", projects: 7, category: "Backend" },
        { id: 9, name: "MongoDB", level: 70, experience: "2 ans", trend: "+10", projects: 5, category: "Backend" },
        { id: 10, name: "GraphQL", level: 65, experience: "1 an", trend: "+30", projects: 3, category: "Backend" }
      ]
    },
    {
      category: "DevOps & Outils",
      skills: [
        { id: 11, name: "Git", level: 95, experience: "5 ans", trend: "+5", projects: 20, category: "DevOps" },
        { id: 12, name: "Docker", level: 78, experience: "2 ans", trend: "+20", projects: 8, category: "DevOps" },
        { id: 13, name: "AWS", level: 60, experience: "1 an", trend: "+35", projects: 4, category: "DevOps" },
        { id: 14, name: "Figma", level: 85, experience: "3 ans", trend: "+10", projects: 12, category: "Design" }
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(cat => cat.skills);

  // Templates de CV disponibles
  const templates = [
    {
      id: "moderne",
      name: "Moderne",
      description: "Design contemporain avec couleurs et sections bien définies",
      preview: "🎨 Coloré et moderne",
      features: ["Couleurs accent", "Layout moderne", "Icônes", "Barres de progression"]
    },
    {
      id: "classique",
      name: "Classique",
      description: "Format traditionnel, sobre et professionnel",
      preview: "📄 Sobre et professionnel",
      features: ["Noir et blanc", "Format standard", "Typographie classique", "Sections traditionnelles"]
    },
    {
      id: "minimaliste",
      name: "Minimaliste",
      description: "Design épuré avec focus sur le contenu",
      preview: "✨ Épuré et élégant",
      features: ["Design épuré", "Beaucoup d'espace blanc", "Typographie fine", "Focus contenu"]
    },
    {
      id: "tech",
      name: "Tech",
      description: "Optimisé pour les développeurs avec focus sur les projets",
      preview: "💻 Spécial développeur",
      features: ["Focus projets", "Liens GitHub", "Métriques techniques", "Stack visible"]
    }
  ];

  // Suggestions IA basées sur le poste ciblé
  const aiSuggestions = {
    "frontend": {
      skills: [1, 2, 3, 5], // React, TypeScript, Tailwind, Next.js
      projects: [1, 2], // E-commerce, Dashboard
      template: "moderne"
    },
    "fullstack": {
      skills: [1, 2, 6, 7, 8], // React, TypeScript, Node.js, Express, PostgreSQL
      projects: [1, 3], // E-commerce, API
      template: "tech"
    },
    "backend": {
      skills: [6, 7, 8, 9, 12], // Node.js, Express, PostgreSQL, MongoDB, Docker
      projects: [3, 1], // API, E-commerce
      template: "classique"
    }
  };

  // Filtrage des compétences
  const filteredSkills = useMemo(() => 
    allSkills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (skillFilter === "all" || skill.category.toLowerCase() === skillFilter.toLowerCase())
    ), [searchTerm, skillFilter]);

  return (
    <div className="flex h-screen bg-background">
      {/* SIDEBAR GAUCHE - Configuration */}
      <div className="w-[480px] border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold mb-2">Générateur CV Intelligent</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Créez des CV optimisés avec l'IA
          </p>
          <Button 
            variant="default" 
            className="w-full gap-2" 
            size="default"
            onClick={() => {
              setIsAIOptimizing(true);
              // Simulation IA
              setTimeout(() => {
                if (targetJob.toLowerCase().includes('frontend')) {
                  setSelectedSkills(aiSuggestions.frontend.skills);
                  setSelectedProjects(aiSuggestions.frontend.projects);
                  setSelectedTemplate(aiSuggestions.frontend.template);
                } else if (targetJob.toLowerCase().includes('backend')) {
                  setSelectedSkills(aiSuggestions.backend.skills);
                  setSelectedProjects(aiSuggestions.backend.projects);
                  setSelectedTemplate(aiSuggestions.backend.template);
                } else {
                  setSelectedSkills(aiSuggestions.fullstack.skills);
                  setSelectedProjects(aiSuggestions.fullstack.projects);
                  setSelectedTemplate(aiSuggestions.fullstack.template);
                }
                setIsAIOptimizing(false);
              }, 2000);
            }}
            disabled={isAIOptimizing || !targetJob}
          >
            <Sparkles className="h-4 w-4" />
            {isAIOptimizing ? "Optimisation..." : "Optimiser avec l'IA"}
          </Button>
        </div>

        <Tabs defaultValue="config" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 mx-6 mt-4 mb-2">
            <TabsTrigger value="config" className="gap-2 text-sm py-2.5">
              <Settings className="h-4 w-4" />
              Config
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2 text-sm py-2.5">
              <Code className="h-4 w-4" />
              Projets
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2 text-sm py-2.5">
              <Award className="h-4 w-4" />
              Skills
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <TabsContent value="config" className="mt-4 h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations du CV
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cv-title" className="text-sm font-medium">Titre du CV</Label>
                      <Input
                        id="cv-title"
                        placeholder="Ex: CV Développeur Full-Stack - React & Node.js"
                        value={cvTitle}
                        onChange={(e) => setCvTitle(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-job" className="text-sm font-medium">Poste ciblé (pour l'IA)</Label>
                      <Input
                        id="target-job"
                        placeholder="Ex: Développeur Frontend, Full-Stack, Backend..."
                        value={targetJob}
                        onChange={(e) => setTargetJob(e.target.value)}
                        className="h-10"
                      />
                      <p className="text-xs text-muted-foreground">
                        L'IA utilisera cette information pour optimiser votre sélection
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Objectif professionnel (optionnel)</Label>
                      <Textarea 
                        placeholder="Décrivez brièvement vos objectifs de carrière..."
                        className="min-h-24 text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Template et Style
                  </h3>
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div 
                        key={template.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                          selectedTemplate === template.id 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-border hover:border-primary/50'
                        }`} 
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-sm">{template.name}</span>
                            <span className="text-sm">{template.preview}</span>
                          </div>
                          {selectedTemplate === template.id && (
                            <Badge variant="default" className="text-xs">Sélectionné</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-4 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Projets
                  </h3>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {selectedProjects.length} sélectionné{selectedProjects.length > 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className={`p-4 border rounded-lg transition-all hover:shadow-sm ${
                        selectedProjects.includes(project.id) 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id={`project-${project.id}`} 
                          checked={selectedProjects.includes(project.id)} 
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProjects([...selectedProjects, project.id]);
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                            }
                          }} 
                          className="mt-1.5"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <label 
                              htmlFor={`project-${project.id}`} 
                              className="font-medium text-sm cursor-pointer leading-tight hover:text-primary transition-colors"
                            >
                              {project.title}
                            </label>
                            {project.featured && (
                              <Badge variant="default" className="gap-1 text-xs">
                                <Star className="h-3 w-3" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">{project.type}</Badge>
                            <Badge 
                              variant={project.status === 'Production' ? 'default' : 'secondary'} 
                              className="text-xs"
                            >
                              {project.status}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                            {project.tags.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.tags.length - 4} autres
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Impact: </span>
                              <span className="font-medium">{project.impact}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Métriques: </span>
                              <span className="font-medium">{project.metrics}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm pt-1">
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
                              >
                                <Globe className="h-3.5 w-3.5" />
                                Site web
                              </a>
                            )}
                            {project.github && (
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-1.5 text-primary hover:underline transition-colors"
                              >
                                <Github className="h-3.5 w-3.5" />
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-4 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Compétences
                  </h3>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {selectedSkills.length} sélectionnée{selectedSkills.length > 1 ? 's' : ''}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher une compétence..." 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                      className="pl-10 h-10 text-sm" 
                    />
                  </div>
                  
                  <Select value={skillFilter} onValueChange={setSkillFilter}>
                    <SelectTrigger className="h-10 text-sm">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrer par catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                  {filteredSkills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className={`p-4 border rounded-lg transition-all hover:shadow-sm ${
                        selectedSkills.includes(skill.id) 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id={`skill-${skill.id}`} 
                          checked={selectedSkills.includes(skill.id)} 
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSkills([...selectedSkills, skill.id]);
                            } else {
                              setSelectedSkills(selectedSkills.filter(id => id !== skill.id));
                            }
                          }}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <label 
                                htmlFor={`skill-${skill.id}`} 
                                className="font-medium text-sm cursor-pointer hover:text-primary transition-colors"
                              >
                                {skill.name}
                              </label>
                              <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                            </div>
                            <span className="text-sm font-medium text-primary">{skill.level}%</span>
                          </div>
                          
                          <Progress value={skill.level} className="h-2 mb-3" />
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Expérience: {skill.experience}</span>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={skill.trend.startsWith('+') ? 'default' : 'secondary'} 
                                className="text-xs h-5"
                              >
                                {skill.trend}% tendance
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-muted-foreground">
                            {skill.projects} projet{skill.projects > 1 ? 's' : ''} réalisé{skill.projects > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredSkills.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">Aucune compétence trouvée</p>
                      <p className="text-xs mt-1">Essayez de modifier vos critères de recherche</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* ZONE DROITE - Aperçu en temps réel */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="p-6 border-b bg-card flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Aperçu en temps réel</h2>
              <p className="text-sm text-muted-foreground">
                {selectedProjects.length} projet{selectedProjects.length > 1 ? 's' : ''} • {selectedSkills.length} compétence{selectedSkills.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Statistiques rapides */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Statistiques du CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Projets sélectionnés</div>
                    <div className="text-2xl font-bold">{selectedProjects.length}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Compétences</div>
                    <div className="text-2xl font-bold">{selectedSkills.length}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Niveau moyen</div>
                    <div className="text-2xl font-bold">
                      {selectedSkills.length > 0 ? Math.round(
                        allSkills
                          .filter(skill => selectedSkills.includes(skill.id))
                          .reduce((sum, skill) => sum + skill.level, 0) / selectedSkills.length
                      ) : 0}%
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Template</div>
                    <div className="text-sm font-semibold">
                      {templates.find(t => t.id === selectedTemplate)?.name || 'Aucun'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aperçu du CV */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Aperçu du CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[210/297] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border-2 border-dashed overflow-hidden">
                  <div className="p-6 h-full overflow-y-auto">
                    {/* Simulation d'un CV */}
                    <div className="bg-white dark:bg-slate-950 rounded shadow-sm p-6 space-y-4">
                      <div className="border-b pb-3">
                        <h2 className="text-lg font-bold">{cvTitle || "Votre CV"}</h2>
                        <p className="text-xs text-muted-foreground">Template {templates.find(t => t.id === selectedTemplate)?.name}</p>
                      </div>

                      {selectedProjects.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Projets ({selectedProjects.length})</h3>
                          <div className="space-y-2">
                            {projects.filter(p => selectedProjects.includes(p.id)).map(project => (
                              <div key={project.id} className="text-xs border-l-2 border-primary pl-2">
                                <div className="font-medium">{project.title}</div>
                                <div className="text-muted-foreground">{project.shortDescription}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedSkills.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Compétences ({selectedSkills.length})</h3>
                          <div className="flex flex-wrap gap-1">
                            {allSkills.filter(s => selectedSkills.includes(s.id)).map(skill => (
                              <Badge key={skill.id} variant="secondary" className="text-xs">
                                {skill.name} ({skill.level}%)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions de génération */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2" size="lg">
                  <Download className="h-4 w-4" />
                  Télécharger PDF
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Aperçu détaillé
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  Mode prévisualisation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
