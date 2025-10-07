import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Star, TrendingUp, Award, Target, Sparkles, Download, Upload, Search, Filter, BarChart3, Zap, Brain, Code, Palette, Grid3X3, Table, Radar, Clock, Eye, FileText, Calendar, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // "cards", "table", "radar", "timeline"
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [certSearchTerm, setCertSearchTerm] = useState("");
  const [certFilter, setCertFilter] = useState("all"); // "all", "active", "expiring", "expired"

  // Données enrichies avec niveaux et progression
  const skillCategories = [
    {
      id: 1,
      category: "Frontend",
      icon: Code,
      color: "bg-blue-500",
      skills: [
        { name: "React", level: 90, experience: "4 ans", trend: "+15", lastUsed: "2025-01-20", projects: 12 },
        { name: "TypeScript", level: 85, experience: "3 ans", trend: "+20", lastUsed: "2025-01-19", projects: 8 },
        { name: "Tailwind CSS", level: 80, experience: "2 ans", trend: "+10", lastUsed: "2025-01-18", projects: 15 },
        { name: "Vue.js", level: 70, experience: "2 ans", trend: "+5", lastUsed: "2024-12-15", projects: 4 },
        { name: "Next.js", level: 75, experience: "2 ans", trend: "+25", lastUsed: "2025-01-15", projects: 6 }
      ],
    },
    {
      id: 2,
      category: "Backend",
      icon: Zap,
      color: "bg-green-500",
      skills: [
        { name: "Node.js", level: 88, experience: "4 ans", trend: "+12", lastUsed: "2025-01-20", projects: 10 },
        { name: "Express", level: 85, experience: "3 ans", trend: "+8", lastUsed: "2025-01-18", projects: 9 },
        { name: "PostgreSQL", level: 75, experience: "3 ans", trend: "+15", lastUsed: "2025-01-10", projects: 7 },
        { name: "MongoDB", level: 70, experience: "2 ans", trend: "+10", lastUsed: "2024-12-20", projects: 5 },
        { name: "GraphQL", level: 65, experience: "1 an", trend: "+30", lastUsed: "2025-01-05", projects: 3 }
      ],
    },
    {
      id: 3,
      category: "DevOps & Outils",
      icon: Target,
      color: "bg-purple-500",
      skills: [
        { name: "Git", level: 95, experience: "5 ans", trend: "+5", lastUsed: "2025-01-20", projects: 20 },
        { name: "Docker", level: 78, experience: "2 ans", trend: "+20", lastUsed: "2025-01-15", projects: 8 },
        { name: "AWS", level: 60, experience: "1 an", trend: "+35", lastUsed: "2025-01-12", projects: 4 },
        { name: "Figma", level: 85, experience: "3 ans", trend: "+10", lastUsed: "2025-01-18", projects: 12 },
        { name: "VS Code", level: 90, experience: "4 ans", trend: "+5", lastUsed: "2025-01-20", projects: 25 }
      ],
    },
    {
      id: 4,
      category: "Soft Skills",
      icon: Brain,
      color: "bg-orange-500",
      skills: [
        { name: "Gestion de projet", level: 80, experience: "3 ans", trend: "+15", lastUsed: "2025-01-19", projects: 8 },
        { name: "Communication", level: 85, experience: "4 ans", trend: "+10", lastUsed: "2025-01-20", projects: 15 },
        { name: "Travail d'équipe", level: 90, experience: "5 ans", trend: "+8", lastUsed: "2025-01-20", projects: 18 },
        { name: "Résolution de problèmes", level: 88, experience: "4 ans", trend: "+12", lastUsed: "2025-01-19", projects: 20 }
      ],
    },
  ];

  // Suggestions IA de compétences tendances
  const aiSuggestions = [
    { name: "Rust", category: "Backend", reason: "Croissance +180% en 2024", priority: "high" },
    { name: "Svelte", category: "Frontend", reason: "Alternative React populaire", priority: "medium" },
    { name: "Kubernetes", category: "DevOps", reason: "Demandé dans 70% des offres", priority: "high" },
    { name: "Machine Learning", category: "IA", reason: "Compétence d'avenir", priority: "medium" }
  ];

  // Données des certifications
  const certifications = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      provider: "Amazon Web Services",
      issueDate: "2024-03-15",
      expiryDate: "2027-03-15",
      credentialId: "AWS-SAA-C03-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      skills: ["AWS", "Cloud Architecture", "EC2", "S3"],
      level: "Associate",
      status: "active", // active, expiring, expired
      image: null,
      description: "Validation des compétences en conception d'architectures cloud scalables et sécurisées sur AWS"
    },
    {
      id: 2,
      name: "React Developer Certification",
      provider: "Meta (Facebook)",
      issueDate: "2023-11-20",
      expiryDate: "2025-11-20",
      credentialId: "META-REACT-789012",
      credentialUrl: "https://developers.facebook.com/certification",
      skills: ["React", "JavaScript", "Frontend"],
      level: "Professional",
      status: "expiring", // expire dans moins de 6 mois
      image: null,
      description: "Certification officielle Meta pour le développement d'applications React modernes"
    },
    {
      id: 3,
      name: "Google Cloud Professional Developer",
      provider: "Google Cloud",
      issueDate: "2023-08-10",
      expiryDate: "2025-08-10",
      credentialId: "GCP-PCD-345678",
      credentialUrl: "https://cloud.google.com/certification",
      skills: ["Google Cloud", "Kubernetes", "Docker", "DevOps"],
      level: "Professional",
      status: "active",
      image: null,
      description: "Expertise en développement d'applications cloud-native sur Google Cloud Platform"
    },
    {
      id: 4,
      name: "MongoDB Developer Associate",
      provider: "MongoDB University",
      issueDate: "2022-05-15",
      expiryDate: "2024-05-15",
      credentialId: "MONGO-DEV-901234",
      credentialUrl: "https://university.mongodb.com/certification",
      skills: ["MongoDB", "NoSQL", "Database Design"],
      level: "Associate",
      status: "expired",
      image: null,
      description: "Compétences avancées en développement avec MongoDB et conception de bases de données NoSQL"
    }
  ];

  // Fonction pour calculer le statut d'expiration
  const getCertificationStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);

    if (expiry < now) return "expired";
    if (expiry < sixMonthsFromNow) return "expiring";
    return "active";
  };

  // Filtrage des certifications
  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
                         cert.provider.toLowerCase().includes(certSearchTerm.toLowerCase());
    const matchesFilter = certFilter === "all" || cert.status === certFilter;
    return matchesSearch && matchesFilter;
  });

  // Statistiques globales
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const averageLevel = Math.round(
    skillCategories.reduce((sum, cat) => 
      sum + cat.skills.reduce((catSum, skill) => catSum + skill.level, 0), 0
    ) / totalSkills
  );
  const expertSkills = skillCategories.reduce((sum, cat) => 
    sum + cat.skills.filter(skill => skill.level >= 80).length, 0
  );

  // Filtrage des compétences
  const filteredCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || category.category === selectedCategory)
    )
  })).filter(category => category.skills.length > 0);

  return (
    <div className="space-y-8 animate-in w-full max-w-full overflow-hidden">
      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Compétences</h1>
          <p className="text-muted-foreground text-lg">
            Gérez et suivez l'évolution de vos compétences techniques et soft skills
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl dialog-centered">
              <DialogHeader>
                <DialogTitle>Analytics des Compétences</DialogTitle>
                <DialogDescription>
                  Analyse détaillée de votre profil de compétences
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="trends">Tendances</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions IA</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalSkills}</div>
                      <div className="text-sm text-muted-foreground">Compétences totales</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{averageLevel}%</div>
                      <div className="text-sm text-muted-foreground">Niveau moyen</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{expertSkills}</div>
                      <div className="text-sm text-muted-foreground">Niveau expert</div>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="suggestions" className="space-y-4">
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant={suggestion.priority === 'high' ? 'default' : 'secondary'}>
                                {suggestion.name}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{suggestion.category}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                          </div>
                          <Button size="sm">Ajouter</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter compétence
              </Button>
            </DialogTrigger>
            <DialogContent className="dialog-centered">
              <DialogHeader>
                <DialogTitle>Ajouter une compétence</DialogTitle>
                <DialogDescription>
                  Ajoutez une nouvelle compétence avec son niveau de maîtrise
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="skillName">Nom de la compétence</Label>
                  <Input id="skillName" placeholder="Ex: React, Python, Leadership..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.category}>
                          {cat.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Niveau de maîtrise (0-100%)</Label>
                  <Input id="level" type="number" min="0" max="100" placeholder="85" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience</Label>
                  <Input id="experience" placeholder="Ex: 3 ans, 6 mois..." />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddSkillOpen(false)}>
                  Annuler
                </Button>
                <Button>Ajouter</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalSkills}</div>
              <div className="text-sm text-muted-foreground">Compétences</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{averageLevel}%</div>
              <div className="text-sm text-muted-foreground">Niveau moyen</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{expertSkills}</div>
              <div className="text-sm text-muted-foreground">Niveau expert</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{aiSuggestions.length}</div>
              <div className="text-sm text-muted-foreground">Suggestions IA</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Onglets principaux */}
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills" className="gap-2">
            <Zap className="h-4 w-4" />
            Compétences
          </TabsTrigger>
          <TabsTrigger value="certifications" className="gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          {/* Filtres, recherche et modes de vue */}
          <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une compétence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {skillCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.category}>
                {cat.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Sélecteur de mode de vue */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={viewMode === "cards" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className="gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Cards
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="gap-2"
          >
            <Table className="h-4 w-4" />
            Tableau
          </Button>
          <Button
            variant={viewMode === "radar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("radar")}
            className="gap-2"
          >
            <Radar className="h-4 w-4" />
            Radar
          </Button>
          <Button
            variant={viewMode === "timeline" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("timeline")}
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            Timeline
          </Button>
        </div>
      </div>

      {/* Affichage dynamique selon le mode */}
      {viewMode === "cards" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${category.color} rounded-lg`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>{category.category}</CardTitle>
                        <CardDescription>
                          {category.skills.length} compétences • Niveau moyen: {Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length)}%
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Ajouter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.experience}
                          </Badge>
                          <Badge variant={skill.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                            {skill.trend}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Utilisé dans {skill.projects} projets</span>
                        <span>Dernière utilisation: {new Date(skill.lastUsed).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {viewMode === "table" && (
        <Card>
          <CardHeader>
            <CardTitle>Tableau des Compétences</CardTitle>
            <CardDescription>Vue d'ensemble complète de toutes vos compétences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Compétence</th>
                    <th className="text-left p-2 font-medium">Catégorie</th>
                    <th className="text-left p-2 font-medium">Niveau</th>
                    <th className="text-left p-2 font-medium">Expérience</th>
                    <th className="text-left p-2 font-medium">Tendance</th>
                    <th className="text-left p-2 font-medium">Projets</th>
                    <th className="text-left p-2 font-medium">Dernière utilisation</th>
                    <th className="text-left p-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.flatMap(category => 
                    category.skills.map(skill => (
                      <tr key={skill.name} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{skill.name}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-xs">
                            {category.category}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Progress value={skill.level} className="h-2 w-20" />
                            <span className="text-sm font-medium">{skill.level}%</span>
                          </div>
                        </td>
                        <td className="p-2 text-sm text-muted-foreground">{skill.experience}</td>
                        <td className="p-2">
                          <Badge variant={skill.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                            {skill.trend}%
                          </Badge>
                        </td>
                        <td className="p-2 text-sm text-muted-foreground">{skill.projects}</td>
                        <td className="p-2 text-sm text-muted-foreground">
                          {new Date(skill.lastUsed).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "radar" && (
        <Card>
          <CardHeader>
            <CardTitle>Vue Radar des Compétences</CardTitle>
            <CardDescription>Visualisation graphique de votre profil de compétences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Radar par catégorie */}
              {filteredCategories.map(category => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 ${category.color} rounded-lg`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">{category.category}</h3>
                  </div>
                  
                  {/* Simulation radar avec barres circulaires */}
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills.map(skill => (
                      <div key={skill.name} className="text-center space-y-2">
                        <div className="relative w-16 h-16 mx-auto">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="text-muted-foreground/20"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeDasharray={`${skill.level * 1.76} 176`}
                              className="text-primary transition-all duration-1000"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold">{skill.level}%</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{skill.name}</div>
                        <div className="text-xs text-muted-foreground">{skill.experience}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "timeline" && (
        <Card>
          <CardHeader>
            <CardTitle>Timeline des Compétences</CardTitle>
            <CardDescription>Évolution chronologique de vos compétences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredCategories.map(category => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 ${category.color} rounded-lg`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">{category.category}</h3>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                    {category.skills
                      .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
                      .map((skill, index) => (
                      <div key={skill.name} className="relative pb-6">
                        <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                        <div className="ml-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{skill.name}</span>
                              <Badge variant="outline" className="text-xs">{skill.level}%</Badge>
                              <Badge variant={skill.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                                {skill.trend}%
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(skill.lastUsed).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <Progress value={skill.level} className="h-2 mb-2" />
                          <div className="text-sm text-muted-foreground">
                            {skill.experience} d'expérience • {skill.projects} projets
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Actions rapides
          </CardTitle>
          <CardDescription>
            Outils pour optimiser votre profil de compétences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Upload className="h-6 w-6" />
              <span>Importer LinkedIn</span>
              <span className="text-xs text-muted-foreground">Synchroniser profil</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Download className="h-6 w-6" />
              <span>Exporter CV</span>
              <span className="text-xs text-muted-foreground">Générer PDF</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <Brain className="h-6 w-6" />
              <span>Suggestions IA</span>
              <span className="text-xs text-muted-foreground">Compétences tendances</span>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
              <BarChart3 className="h-6 w-6" />
              <span>Analyse détaillée</span>
              <span className="text-xs text-muted-foreground">Rapport complet</span>
            </Button>
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          {/* Header avec actions pour certifications */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
              <p className="text-muted-foreground">
                Gérez vos certifications et validations de compétences
              </p>
            </div>
            <Dialog open={isAddCertificationOpen} onOpenChange={setIsAddCertificationOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter certification
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl dialog-centered">
                <DialogHeader>
                  <DialogTitle>Ajouter une certification</DialogTitle>
                  <DialogDescription>
                    Ajoutez une nouvelle certification avec tous les détails
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cert-name">Nom de la certification *</Label>
                      <Input id="cert-name" placeholder="Ex: AWS Solutions Architect" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cert-provider">Organisme *</Label>
                      <Input id="cert-provider" placeholder="Ex: Amazon Web Services" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cert-level">Niveau</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="foundation">Foundation</SelectItem>
                          <SelectItem value="associate">Associate</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cert-credential">ID Credential</Label>
                      <Input id="cert-credential" placeholder="Ex: AWS-SAA-C03-123456" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cert-issue">Date d'obtention *</Label>
                      <Input id="cert-issue" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cert-expiry">Date d'expiration</Label>
                      <Input id="cert-expiry" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cert-url">URL de vérification</Label>
                    <Input id="cert-url" placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cert-skills">Compétences liées (séparées par virgules)</Label>
                    <Input id="cert-skills" placeholder="AWS, Cloud Architecture, EC2, S3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cert-description">Description</Label>
                    <Input id="cert-description" placeholder="Brève description de la certification..." />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddCertificationOpen(false)}>
                    Annuler
                  </Button>
                  <Button>Ajouter</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Statistiques des certifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{certifications.filter(c => c.status === 'active').length}</div>
                  <div className="text-sm text-muted-foreground">Actives</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{certifications.filter(c => c.status === 'expiring').length}</div>
                  <div className="text-sm text-muted-foreground">À renouveler</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{certifications.filter(c => c.status === 'expired').length}</div>
                  <div className="text-sm text-muted-foreground">Expirées</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{certifications.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Filtres pour certifications */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une certification..."
                value={certSearchTerm}
                onChange={(e) => setCertSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={certFilter} onValueChange={setCertFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="expiring">À renouveler</SelectItem>
                <SelectItem value="expired">Expirées</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Liste des certifications */}
          <div className="grid gap-4">
            {filteredCertifications.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <CardTitle className="text-xl">{cert.name}</CardTitle>
                        <Badge variant="outline">{cert.level}</Badge>
                        <Badge 
                          variant={
                            cert.status === 'active' ? 'default' : 
                            cert.status === 'expiring' ? 'destructive' : 
                            'secondary'
                          }
                          className="gap-1"
                        >
                          {cert.status === 'active' && <CheckCircle className="h-3 w-3" />}
                          {cert.status === 'expiring' && <AlertCircle className="h-3 w-3" />}
                          {cert.status === 'expired' && <AlertCircle className="h-3 w-3" />}
                          {cert.status === 'active' ? 'Active' : 
                           cert.status === 'expiring' ? 'À renouveler' : 'Expirée'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{cert.provider}</p>
                      <p className="text-sm">{cert.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Compétences liées */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Informations détaillées */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Obtenu le {new Date(cert.issueDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Expire le {new Date(cert.expiryDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{cert.credentialId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Vérifier
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* État vide pour certifications */}
          {filteredCertifications.length === 0 && (
            <Card className="p-12 text-center border-dashed">
              <div className="space-y-6">
                <div className="mx-auto w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center">
                  <Award className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">Aucune certification trouvée</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {certSearchTerm || certFilter !== 'all' 
                      ? "Aucune certification ne correspond à vos critères de recherche"
                      : "Commencez par ajouter votre première certification pour valider vos compétences"
                    }
                  </p>
                </div>
                <Button 
                  className="gap-2"
                  onClick={() => setIsAddCertificationOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une certification
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Skills;
