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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileText, Sparkles, Target, Eye, Settings, Zap, Brain, Palette, Filter, Search, Star, TrendingUp, Calendar, Globe, Github, Award, Code, Users } from "lucide-react";
import { useState } from "react";

const CVGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("moderne");
  const [cvTitle, setCvTitle] = useState("");
  const [targetJob, setTargetJob] = useState("");
  const [isAIOptimizing, setIsAIOptimizing] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([1, 2]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([1, 2, 3]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");

  // Données enrichies des projets (issues de la page Projects)
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
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
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
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
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
      image: null,
      featured: false,
      impact: "Gain de 80% de temps en documentation",
      metrics: "50+ APIs documentées automatiquement"
    },
  ];

  // Données enrichies des compétences (issues de la page Skills)
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
  const filteredSkills = allSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (skillFilter === "all" || skill.category.toLowerCase() === skillFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in w-full max-w-full overflow-hidden">
      {/* Header avec actions intelligentes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Générateur de CV Intelligent</h1>
          <p className="text-muted-foreground text-lg">
            Créez des CV optimisés avec l'IA en exploitant vos projets et compétences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
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
      </div>

      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="config" className="gap-2">
            <Settings className="h-4 w-4" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <Code className="h-4 w-4" />
            Projets
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-2">
            <Zap className="h-4 w-4" />
            Compétences
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Aperçu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Configuration générale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Informations du CV
                </CardTitle>
                <CardDescription>
                  Configurez les paramètres de base de votre CV
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cv-title">Titre du CV</Label>
                  <Input
                    id="cv-title"
                    placeholder="Ex: CV Développeur Full-Stack - React & Node.js"
                    value={cvTitle}
                    onChange={(e) => setCvTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-job">Poste ciblé (pour l'IA)</Label>
                  <Input
                    id="target-job"
                    placeholder="Ex: Développeur Frontend, Full-Stack, Backend..."
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    L'IA utilisera cette information pour optimiser votre sélection
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Objectif professionnel (optionnel)</Label>
                  <Textarea 
                    placeholder="Décrivez brièvement vos objectifs de carrière..."
                    className="min-h-20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sélection de template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Modèle de CV
                </CardTitle>
                <CardDescription>
                  Choisissez le style qui correspond à votre secteur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-sm">{template.preview}</span>
                        </div>
                        {selectedTemplate === template.id && (
                          <Badge variant="default">Sélectionné</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Sélection des Projets
              </CardTitle>
              <CardDescription>
                Choisissez les projets qui correspondent le mieux au poste visé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 border rounded-lg transition-all ${
                    selectedProjects.includes(project.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
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
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`project-${project.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {project.title}
                        </label>
                        <Badge variant="outline">{project.type}</Badge>
                        <Badge variant={project.status === 'Production' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        {project.featured && (
                          <Badge variant="default" className="gap-1">
                            <Star className="h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Impact: </span>
                          <span className="font-medium">{project.impact}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Métriques: </span>
                          <span className="font-medium">{project.metrics}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <Globe className="h-3 w-3" />
                            Site web
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <Github className="h-3 w-3" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Sélection des Compétences
              </CardTitle>
              <CardDescription>
                Choisissez les compétences les plus pertinentes pour le poste
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtres pour les compétences */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une compétence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Liste des compétences */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-3 border rounded-lg transition-all ${
                      selectedSkills.includes(skill.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
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
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`skill-${skill.id}`}
                              className="font-medium cursor-pointer"
                            >
                              {skill.name}
                            </label>
                            <Badge variant="outline" className="text-xs">
                              {skill.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {skill.experience}
                            </Badge>
                            <Badge variant={skill.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                              {skill.trend}%
                            </Badge>
                          </div>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 mb-2" />
                        <div className="text-xs text-muted-foreground">
                          Utilisé dans {skill.projects} projets
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Aperçu du CV
                  </CardTitle>
                  <CardDescription>
                    Prévisualisation de votre CV avec le template {templates.find(t => t.id === selectedTemplate)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[210/297] bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-4 p-8">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                      <div className="space-y-2">
                        <h3 className="font-semibold">Aperçu du CV</h3>
                        <p className="text-sm text-muted-foreground">
                          Template: {templates.find(t => t.id === selectedTemplate)?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedProjects.length} projets • {selectedSkills.length} compétences
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Statistiques du CV */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projets sélectionnés:</span>
                      <span className="font-medium">{selectedProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compétences sélectionnées:</span>
                      <span className="font-medium">{selectedSkills.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Niveau moyen:</span>
                      <span className="font-medium">
                        {Math.round(
                          allSkills
                            .filter(skill => selectedSkills.includes(skill.id))
                            .reduce((sum, skill) => sum + skill.level, 0) / selectedSkills.length
                        )}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template:</span>
                      <span className="font-medium">
                        {templates.find(t => t.id === selectedTemplate)?.name}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions de génération */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Génération
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
                    <Sparkles className="h-4 w-4" />
                    Optimiser avec l'IA
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVGenerator;
