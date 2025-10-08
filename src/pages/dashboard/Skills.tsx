import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Grid3X3, Table, Radar, Clock, Award, TrendingUp, Star, Sparkles, Zap, Code, Target, Brain, Trash2, BarChart3, CheckCircle, AlertCircle, Calendar, ExternalLink, ChevronDown, ChevronUp, Upload, Download, FileText } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showAllInTable, setShowAllInTable] = useState(false);
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [certSearchTerm, setCertSearchTerm] = useState("");
  const [certFilter, setCertFilter] = useState("all"); // "all", "active", "expiring", "expired"
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
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

      {/* Statistiques rapides - Version compacte */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <Award className="h-3 w-3 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold">{totalSkills}</div>
              <div className="text-xs text-muted-foreground">Compétences</div>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-500/10 rounded-md">
              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold">{averageLevel}%</div>
              <div className="text-xs text-muted-foreground">Niveau moy.</div>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-500/10 rounded-md">
              <Star className="h-3 w-3 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-lg font-bold">{expertSkills}</div>
              <div className="text-xs text-muted-foreground">Expert</div>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-500/10 rounded-md">
              <Sparkles className="h-3 w-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-bold">{aiSuggestions.length}</div>
              <div className="text-xs text-muted-foreground">IA</div>
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
            variant={(viewMode === "cards" ? "default" : "ghost") as "default" | "ghost"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className="gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Cards
          </Button>
          <Button
            variant={(viewMode === "table" ? "default" : "ghost") as "default" | "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="gap-2"
          >
            <Table className="h-4 w-4" />
            Tableau
          </Button>
        </div>
      </div>

      {/* Affichage dynamique selon le mode */}
      {viewMode === "cards" && (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            const isExpanded = expandedCategories.has(category.category);
            const skillsToShow = isExpanded ? category.skills : category.skills.slice(0, 3);
            
            return (
              <Card key={category.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${category.color}`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{category.category}</CardTitle>
                        <CardDescription className="text-xs">
                          {category.skills.length} compétence{category.skills.length > 1 ? 's' : ''}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {skillsToShow.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="font-medium text-sm truncate">{skill.name}</span>
                        <Badge variant="outline" className="text-xs px-1 py-0 h-4 shrink-0">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="w-12 bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {category.skills.length > 3 && (
                    <div className="text-center pt-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-muted-foreground h-6 hover:text-primary gap-1"
                        onClick={() => {
                          const newExpanded = new Set(expandedCategories);
                          if (isExpanded) {
                            newExpanded.delete(category.category);
                          } else {
                            newExpanded.add(category.category);
                          }
                          setExpandedCategories(newExpanded);
                        }}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Voir moins
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            +{category.skills.length - 3} autres
                          </>
                        )}
                      </Button>
                    </div>
                  )}
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
                  {(() => {
                    const allSkills = filteredCategories.flatMap(category => 
                      category.skills.map(skill => ({ ...skill, category: category.category }))
                    );
                    const skillsToShow = showAllInTable ? allSkills : allSkills.slice(0, 10);
                    return skillsToShow.map(skill => (
                      <tr key={skill.name} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{skill.name}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Progress value={skill.level} className="h-2 w-20 [&>div]:bg-slate-400 dark:[&>div]:bg-slate-500" />
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
                    ));
                  })()}
                  {/* Bouton voir plus global */}
                  {(() => {
                    const totalSkills = filteredCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
                    if (totalSkills > 10 && !showAllInTable) {
                      return (
                        <tr className="border-b">
                          <td colSpan={8} className="p-2 text-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-muted-foreground hover:text-primary gap-1"
                              onClick={() => setShowAllInTable(true)}
                            >
                              <ChevronDown className="h-3 w-3" />
                              Voir les {totalSkills - 10} autres compétences
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })()}
                </tbody>
              </table>
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

          {/* Statistiques des certifications - Version compacte */}
          <div className="grid grid-cols-4 gap-3">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-500/10 rounded-md">
                  <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-bold">{certifications.filter(c => c.status === 'active').length}</div>
                  <div className="text-xs text-muted-foreground">Actives</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-500/10 rounded-md">
                  <AlertCircle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-lg font-bold">{certifications.filter(c => c.status === 'expiring').length}</div>
                  <div className="text-xs text-muted-foreground">À renouveler</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-500/10 rounded-md">
                  <AlertCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-lg font-bold">{certifications.filter(c => c.status === 'expired').length}</div>
                  <div className="text-xs text-muted-foreground">Expirées</div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-md">
                  <Award className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold">{certifications.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
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
