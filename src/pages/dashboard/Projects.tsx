import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ExternalLink, FolderKanban, Github, Globe, Sparkles, Download, Eye, EyeOff, Calendar, Star, GitBranch, Upload, Image as ImageIcon, Link as LinkIcon, FileText, Share2, Linkedin, Twitter, Hash, Copy, Send, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isGithubDialogOpen, setIsGithubDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [projectImage, setProjectImage] = useState("");
  const [imageUploadType, setImageUploadType] = useState("url"); // "url" ou "upload"
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [selectedProjectForArticle, setSelectedProjectForArticle] = useState<number | null>(null);
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("linkedin");
  const [generatedArticle, setGeneratedArticle] = useState("");

  // Mock data étendu avec plus d'informations
  const projects = [
    {
      id: 1,
      title: "Plateforme E-Commerce",
      description: "Application complète avec panier, paiements Stripe et gestion des commandes. Interface moderne avec React, backend robuste Node.js et base de données PostgreSQL optimisée.",
      shortDescription: "E-commerce moderne avec paiements intégrés",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript"],
      visible: true,
      featured: true,
      createdAt: "2025-01-15",
      updatedAt: "2025-01-20",
      url: "https://ecommerce-demo.com",
      github: "https://github.com/hantan/ecommerce-platform",
      type: "Full-Stack",
      status: "Production",
      stars: 24,
      language: "TypeScript",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
      category: "Web Application"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Interface de visualisation de données en temps réel avec graphiques interactifs D3.js. Système de monitoring avancé avec WebSockets pour les mises à jour live.",
      shortDescription: "Dashboard temps réel avec analytics avancés",
      tags: ["TypeScript", "D3.js", "Tailwind", "WebSocket", "Chart.js"],
      visible: true,
      featured: false,
      createdAt: "2025-01-10",
      updatedAt: "2025-01-18",
      url: "https://analytics-dashboard.com",
      github: "https://github.com/hantan/analytics-dashboard",
      type: "Frontend",
      status: "Production",
      stars: 12,
      language: "TypeScript",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      category: "Data Visualization"
    },
    {
      id: 3,
      title: "API REST Documentation",
      description: "Système de documentation automatique pour APIs REST avec génération de schémas OpenAPI et interface Swagger interactive.",
      shortDescription: "Documentation automatique d'APIs",
      tags: ["Node.js", "Express", "Swagger", "OpenAPI"],
      visible: false,
      featured: false,
      createdAt: "2024-12-20",
      updatedAt: "2024-12-25",
      url: null,
      github: "https://github.com/hantan/api-docs-generator",
      type: "Backend",
      status: "Development",
      stars: 8,
      language: "JavaScript",
      image: null,
      category: "Developer Tools"
    },
  ];

  // Mock GitHub repos (simulé)
  const githubRepos = [
    {
      id: 101,
      name: "portfolio-website",
      description: "Mon portfolio personnel avec React et Tailwind CSS",
      language: "TypeScript",
      stars: 15,
      url: "https://github.com/hantan/portfolio-website",
      updated_at: "2025-01-05",
      topics: ["react", "tailwind", "portfolio", "typescript"]
    },
    {
      id: 102,
      name: "ai-chat-bot",
      description: "Chatbot intelligent avec intégration OpenAI",
      language: "Python",
      stars: 32,
      url: "https://github.com/hantan/ai-chat-bot",
      updated_at: "2025-01-03",
      topics: ["python", "openai", "chatbot", "ai"]
    },
    {
      id: 103,
      name: "mobile-expense-tracker",
      description: "Application mobile de suivi des dépenses avec React Native",
      language: "JavaScript",
      stars: 7,
      url: "https://github.com/hantan/mobile-expense-tracker",
      updated_at: "2024-12-28",
      topics: ["react-native", "mobile", "finance", "tracker"]
    }
  ];

  // Données des événements
  const events = [
    {
      id: 1,
      title: "Conférence DevFest 2024",
      type: "conference",
      date: "2024-12-15",
      location: "Paris, France",
      description: "Présentation sur les dernières tendances en développement web avec React et TypeScript",
      role: "Speaker",
      audience: 300,
      topics: ["React", "TypeScript", "Performance"],
      linkedProject: 1, // ID du projet lié
      article: "Retour d'expérience enrichissant sur cette conférence...",
      status: "completed",
      url: "https://devfest.gdgparis.com"
    },
    {
      id: 2,
      title: "Hackathon AI for Good",
      type: "hackathon",
      date: "2025-01-10",
      location: "Lyon, France",
      description: "Développement d'une solution IA pour l'accessibilité",
      role: "Participant",
      team: "Team Innovation",
      prize: "2ème place",
      topics: ["AI", "Accessibility", "Social Impact"],
      linkedProject: null,
      article: "48h intenses de développement pour créer une solution innovative...",
      status: "completed"
    },
    {
      id: 3,
      title: "Workshop React Native",
      type: "workshop",
      date: "2025-02-05",
      location: "En ligne",
      description: "Animation d'un workshop sur le développement mobile avec React Native",
      role: "Animateur",
      audience: 50,
      topics: ["React Native", "Mobile", "Cross-platform"],
      linkedProject: 103,
      article: "",
      status: "upcoming"
    }
  ];

  // Templates d'articles par plateforme
  const articleTemplates = {
    linkedin: {
      name: "LinkedIn",
      icon: Linkedin,
      maxLength: 3000,
      style: "Professionnel et engageant",
      structure: "🎯 Hook + 📊 Contexte + 💡 Solution + 🚀 Résultats + 🔗 CTA"
    },
    twitter: {
      name: "Twitter",
      icon: Twitter,
      maxLength: 280,
      style: "Concis et percutant",
      structure: "🔥 Hook + 💡 Point clé + 🔗 Lien"
    },
    medium: {
      name: "Medium",
      icon: FileText,
      maxLength: 10000,
      style: "Technique et détaillé",
      structure: "📖 Introduction + 🔧 Technique + 💻 Code + 📈 Résultats + 💭 Conclusion"
    },
    hashnode: {
      name: "Hashnode",
      icon: Hash,
      maxLength: 8000,
      style: "Technique pour développeurs",
      structure: "🚀 Intro + ⚡ Stack + 💡 Défis + 🛠️ Solutions + 📊 Métriques"
    }
  };

  // Fonction pour générer un article avec l'IA
  const generateArticle = (project: any, platform: string) => {
    setIsGeneratingArticle(true);
    
    // Simulation de génération IA
    setTimeout(() => {
      const template = articleTemplates[platform as keyof typeof articleTemplates];
      let article = "";

      if (platform === "linkedin") {
        article = `🚀 Fier de partager mon dernier projet : ${project.title} !

📊 Le défi : Créer ${project.shortDescription.toLowerCase()} avec une expérience utilisateur exceptionnelle.

💡 La solution : 
${project.description}

🛠️ Stack technique :
${project.tags.map((tag: string) => `• ${tag}`).join('\n')}

📈 Résultats impressionnants :
• ${project.impact || "Performance optimisée"}
• ${project.metrics || "Métriques exceptionnelles"}
• ${project.stars} ⭐ sur GitHub

🔗 Découvrez le projet : ${project.url || project.github}

#${project.tags.join(' #')} #WebDevelopment #Innovation

Qu'en pensez-vous ? 💭`;
      } else if (platform === "twitter") {
        article = `🚀 Nouveau projet : ${project.title}

${project.shortDescription}

Stack: ${project.tags.slice(0, 3).join(', ')}

${project.impact}

🔗 ${project.url || project.github}

#${project.tags[0]} #WebDev`;
      } else if (platform === "medium") {
        article = `# Comment j'ai créé ${project.title} : Un guide complet

## Introduction

${project.description}

## Stack technique choisie

${project.tags.map((tag: string) => `### ${tag}\nPourquoi j'ai choisi ${tag} pour ce projet...`).join('\n\n')}

## Défis rencontrés et solutions

### Défi 1 : Performance
Solution implémentée...

### Défi 2 : Scalabilité  
Approche adoptée...

## Résultats et métriques

${project.impact}
${project.metrics}

## Conclusion

Ce projet m'a permis d'approfondir mes compétences en ${project.tags.join(', ')}.

**Liens utiles :**
- 🌐 [Démo live](${project.url})
- 💻 [Code source](${project.github})`;
      } else if (platform === "hashnode") {
        article = `# ${project.title} : Retour d'expérience technique

## TL;DR
${project.shortDescription} avec ${project.tags.join(', ')}.

## Context & Motivation
${project.description}

## Tech Stack Deep Dive
${project.tags.map((tag: string) => `- **${tag}** : Utilisé pour...`).join('\n')}

## Architecture & Implementation
\`\`\`
// Code snippet example
\`\`\`

## Performance & Results
- ${project.impact}
- ${project.metrics}
- ${project.stars} GitHub stars

## Lessons Learned
1. Point technique 1
2. Point technique 2
3. Point technique 3

## Resources
- [Live Demo](${project.url})
- [GitHub Repo](${project.github})

---
*Qu'est-ce que vous auriez fait différemment ? 💭*`;
      }

      setGeneratedArticle(article);
      setIsGeneratingArticle(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in w-full max-w-full overflow-hidden">
      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Projets & Événements</h1>
          <p className="text-muted-foreground text-lg">
            Gérez vos projets, événements et leur visibilité sur votre portfolio
          </p>
        </div>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="projects" className="gap-2">
            <FolderKanban className="h-4 w-4" />
            Projets
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="h-4 w-4" />
            Événements
          </TabsTrigger>
        </TabsList>

        {/* Contenu Projets */}
        <TabsContent value="projects" className="space-y-6 mt-6">
          <div className="flex items-center gap-3">
            {/* Bouton Import GitHub */}
            <Dialog open={isGithubDialogOpen} onOpenChange={setIsGithubDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                Importer GitHub
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl dialog-centered">
              <DialogHeader>
                <DialogTitle>Importer depuis GitHub</DialogTitle>
                <DialogDescription>
                  Sélectionnez vos repositories GitHub à ajouter à votre portfolio
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {githubRepos.map((repo) => (
                  <Card key={repo.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{repo.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {repo.language}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            {repo.stars}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {repo.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Mis à jour le {new Date(repo.updated_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Button size="sm" className="ml-4">
                        <Download className="h-4 w-4 mr-2" />
                        Importer
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Bouton Nouveau Projet */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau projet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dialog-centered">
              <DialogHeader>
                <DialogTitle>Créer un nouveau projet</DialogTitle>
                <DialogDescription>
                  Ajoutez un projet à votre portfolio avec tous les détails
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre du projet *</Label>
                    <Input id="title" placeholder="Mon Super Projet" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Application</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="desktop">Desktop App</SelectItem>
                        <SelectItem value="api">API/Backend</SelectItem>
                        <SelectItem value="tools">Developer Tools</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shortDesc">Description courte *</Label>
                  <Input id="shortDesc" placeholder="Description en une ligne pour le portfolio" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description complète</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Description détaillée du projet, technologies utilisées, défis relevés..."
                    className="min-h-24"
                  />
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      disabled={isGeneratingAI}
                    >
                      <Sparkles className="h-4 w-4" />
                      {isGeneratingAI ? "Génération..." : "Rédiger avec l'IA"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      L'IA vous aidera à rédiger une description professionnelle
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de projet</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullstack">Full-Stack</SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Statut..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="development">Développement</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">Repository GitHub</Label>
                    <Input id="github" placeholder="https://github.com/user/repo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL du projet</Label>
                    <Input id="url" placeholder="https://monprojet.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Technologies (séparées par des virgules)</Label>
                  <Input id="tags" placeholder="React, Node.js, PostgreSQL, Docker" />
                </div>

                {/* Section Image du projet */}
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <Label className="text-base font-medium">Image du projet</Label>
                  
                  <Tabs value={imageUploadType} onValueChange={setImageUploadType}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="url" className="gap-2">
                        <LinkIcon className="h-4 w-4" />
                        URL d'image
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload fichier
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="url" className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">URL de l'image</Label>
                        <Input 
                          id="imageUrl" 
                          placeholder="https://example.com/image.jpg"
                          value={projectImage}
                          onChange={(e) => setProjectImage(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Utilisez une URL d'image (JPG, PNG, WebP). Recommandé: 400x200px
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upload" className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Glissez votre image ici</p>
                          <p className="text-xs text-muted-foreground">ou cliquez pour parcourir</p>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Choisir un fichier
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          JPG, PNG, WebP jusqu'à 5MB
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Aperçu de l'image */}
                  {projectImage && imageUploadType === "url" && (
                    <div className="space-y-2">
                      <Label>Aperçu</Label>
                      <div className="border rounded-lg overflow-hidden bg-muted/10">
                        <img 
                          src={projectImage} 
                          alt="Aperçu du projet"
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "";
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="visible" />
                  <Label htmlFor="visible">Visible sur le portfolio</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Projet mis en avant</Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button>Créer le projet</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Liste des projets */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary overflow-hidden">
            {/* Image du projet */}
            {project.image && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    {project.featured && (
                      <Badge variant="default" className="gap-1 bg-white/20 backdrop-blur-sm text-white border-white/30">
                        <Star className="h-3 w-3" />
                        Mis en avant
                      </Badge>
                    )}
                    <Badge variant="outline" className="gap-1 bg-white/20 backdrop-blur-sm text-white border-white/30">
                      <GitBranch className="h-3 w-3" />
                      {project.type}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    {/* Afficher les badges seulement si pas d'image ou si pas featured */}
                    {(!project.image || !project.featured) && project.featured && (
                      <Badge variant="default" className="gap-1">
                        <Star className="h-3 w-3" />
                        Mis en avant
                      </Badge>
                    )}
                    <Badge variant={project.visible ? "default" : "secondary"} className="gap-1">
                      {project.visible ? (
                        <>
                          <Eye className="h-3 w-3" />
                          Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          Caché
                        </>
                      )}
                    </Badge>
                    {/* Afficher le type seulement si pas d'image */}
                    {!project.image && (
                      <Badge variant="outline" className="gap-1">
                        <GitBranch className="h-3 w-3" />
                        {project.type}
                      </Badge>
                    )}
                    <Badge 
                      variant={project.status === 'Production' ? 'default' : 'secondary'}
                      className="gap-1"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">{project.shortDescription}</p>
                    <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    disabled={isGeneratingAI}
                  >
                    <Sparkles className="h-4 w-4" />
                    IA
                  </Button>
                  <Switch checked={project.visible} />
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Informations du projet */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>MAJ le {new Date(project.updatedAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>{project.stars} stars</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {project.language}
                  </Badge>
                  <span>{project.category}</span>
                </div>
              </div>
              
              {/* Actions et liens */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Voir le site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Repository
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedProjectForArticle(project.id);
                      setIsArticleDialogOpen(true);
                    }}
                    className="gap-2"
                  >
                    <Share2 className="h-3 w-3" />
                    Créer article
                  </Button>
                  <Button variant="outline" size="sm">
                    Prévisualiser
                  </Button>
                  <Button size="sm">
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* État vide */}
      {projects.length === 0 && (
        <Card className="p-12 text-center border-dashed">
          <div className="space-y-6">
            <div className="mx-auto w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center">
              <FolderKanban className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-xl">Aucun projet pour le moment</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Commencez par créer votre premier projet ou importez vos repositories GitHub existants
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button 
                className="gap-2"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Créer un projet
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsGithubDialogOpen(true)}
              >
                <Github className="h-4 w-4" />
                Importer GitHub
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Statistiques en bas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{projects.length}</div>
          <div className="text-sm text-muted-foreground">Projets total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{projects.filter(p => p.visible).length}</div>
          <div className="text-sm text-muted-foreground">Visibles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">{projects.filter(p => p.featured).length}</div>
          <div className="text-sm text-muted-foreground">Mis en avant</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{projects.filter(p => p.status === 'Production').length}</div>
          <div className="text-sm text-muted-foreground">En production</div>
        </div>
      </div>

      {/* Modal de génération d'articles */}
      <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dialog-centered">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Générer un article
            </DialogTitle>
            <DialogDescription>
              Créez un article optimisé pour vos réseaux sociaux basé sur votre projet
            </DialogDescription>
          </DialogHeader>
          
          {selectedProjectForArticle && (
            <div className="space-y-6">
              {/* Sélection de plateforme */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Plateforme cible</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(articleTemplates).map(([key, template]) => {
                    const IconComponent = template.icon;
                    return (
                      <div
                        key={key}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPlatform === key
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPlatform(key)}
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <IconComponent className="h-6 w-6" />
                          <span className="font-medium text-sm">{template.name}</span>
                          <span className="text-xs text-muted-foreground">{template.style}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Informations sur le template sélectionné */}
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Structure recommandée :</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {articleTemplates[selectedPlatform as keyof typeof articleTemplates].structure}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Limite : {articleTemplates[selectedPlatform as keyof typeof articleTemplates].maxLength} caractères
                  </p>
                </div>
              </div>

              {/* Aperçu du projet */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Projet sélectionné</Label>
                <Card className="p-4">
                  {(() => {
                    const project = projects.find(p => p.id === selectedProjectForArticle);
                    return project ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          <Badge variant="outline">{project.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </Card>
              </div>

              {/* Génération et aperçu */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Article généré</Label>
                  <Button
                    onClick={() => {
                      const project = projects.find(p => p.id === selectedProjectForArticle);
                      if (project) {
                        generateArticle(project, selectedPlatform);
                      }
                    }}
                    disabled={isGeneratingArticle}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isGeneratingArticle ? "Génération..." : "Générer avec l'IA"}
                  </Button>
                </div>
                
                <Textarea
                  value={generatedArticle}
                  onChange={(e) => setGeneratedArticle(e.target.value)}
                  placeholder={isGeneratingArticle ? "Génération en cours..." : "L'article généré apparaîtra ici..."}
                  className="min-h-64 font-mono text-sm"
                  disabled={isGeneratingArticle}
                />
                
                {generatedArticle && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {generatedArticle.length} / {articleTemplates[selectedPlatform as keyof typeof articleTemplates].maxLength} caractères
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(generatedArticle)}
                        className="gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copier
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>
                  Fermer
                </Button>
                {generatedArticle && (
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Publier sur {articleTemplates[selectedPlatform as keyof typeof articleTemplates].name}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
        </TabsContent>

        {/* Contenu Événements */}
        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Événements</h2>
              <p className="text-muted-foreground">Gérez vos participations aux événements tech</p>
            </div>
            <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un événement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl dialog-centered">
                <DialogHeader>
                  <DialogTitle>Nouveau événement</DialogTitle>
                  <DialogDescription>
                    Ajoutez un événement auquel vous avez participé ou allez participer
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Titre de l'événement</Label>
                      <Input id="event-title" placeholder="Ex: DevFest 2024" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conference">Conférence</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="meetup">Meetup</SelectItem>
                          <SelectItem value="competition">Compétition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-location">Lieu</Label>
                      <Input id="event-location" placeholder="Ex: Paris, France" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea id="event-description" placeholder="Décrivez votre participation..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-role">Votre rôle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="speaker">Speaker</SelectItem>
                          <SelectItem value="participant">Participant</SelectItem>
                          <SelectItem value="organizer">Organisateur</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="jury">Jury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linked-project">Projet lié (optionnel)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Associer un projet" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-article">Article/Retour d'expérience</Label>
                    <Textarea 
                      id="event-article" 
                      placeholder="Rédigez un article sur cet événement..." 
                      className="min-h-32"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={() => setIsCreateEventOpen(false)}>
                      Créer l'événement
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Liste des événements */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{event.type}</Badge>
                        <Badge variant={event.status === 'completed' ? 'default' : 'outline'}>
                          {event.status === 'completed' ? 'Terminé' : 'À venir'}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div>{event.location}</div>
                  </div>
                  
                  <p className="text-sm">{event.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.role}
                    </Badge>
                    {event.linkedProject && (
                      <Badge variant="outline" className="text-xs">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        Projet lié
                      </Badge>
                    )}
                  </div>
                  
                  {event.topics && (
                    <div className="flex flex-wrap gap-1">
                      {event.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      {event.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={event.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {event.article && (
                        <Button variant="ghost" size="sm">
                          <FileText className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
