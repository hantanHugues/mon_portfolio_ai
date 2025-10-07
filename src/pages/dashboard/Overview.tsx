import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Award, FileText, TrendingUp, Users, Target, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { PopularityChart, PerformanceChart, ActivityCalendar } from "@/components/charts";
import { useState, useEffect } from "react";

const Overview = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Gérer l'état du bouton selon la position de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Considérer qu'on est en bas si on est à moins de 100px du bas
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    // Vérifier la position initiale
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour naviguer (haut/bas selon la position)
  const handleScroll = () => {
    if (isAtBottom) {
      // Aller en haut
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Aller en bas
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Données mock pour les graphiques
  const popularityData = [
    { date: '01/01', visitors: 45, contacts: 3 },
    { date: '02/01', visitors: 52, contacts: 5 },
    { date: '03/01', visitors: 48, contacts: 2 },
    { date: '04/01', visitors: 61, contacts: 7 },
    { date: '05/01', visitors: 55, contacts: 4 },
    { date: '06/01', visitors: 67, contacts: 6 },
    { date: '07/01', visitors: 73, contacts: 8 },
    { date: '08/01', visitors: 69, contacts: 5 },
    { date: '09/01', visitors: 78, contacts: 9 },
    { date: '10/01', visitors: 82, contacts: 12 },
  ];

  const performanceData = [
    { week: 'S1', projects: 2, updates: 5, goal: 3 },
    { week: 'S2', projects: 1, updates: 3, goal: 3 },
    { week: 'S3', projects: 3, updates: 7, goal: 3 },
    { week: 'S4', projects: 2, updates: 4, goal: 3 },
    { week: 'S5', projects: 4, updates: 8, goal: 3 },
    { week: 'S6', projects: 1, updates: 2, goal: 3 },
  ];

  const activityData = [
    { date: '2024-01-01', count: 3, level: 2 as const },
    { date: '2024-01-02', count: 5, level: 3 as const },
    { date: '2024-01-03', count: 1, level: 1 as const },
    { date: '2024-01-04', count: 0, level: 0 as const },
    { date: '2024-01-05', count: 7, level: 4 as const },
    // Ajoutez plus de données selon vos besoins
  ];

  const stats = [
    {
      title: "Projets",
      value: "12",
      description: "8 visibles sur le portfolio",
      icon: FolderKanban,
      trend: "+2 ce mois",
    },
    {
      title: "Compétences",
      value: "24",
      description: "Technologies maîtrisées",
      icon: Award,
      trend: "+3 ajoutées",
    },
    {
      title: "CV Générés",
      value: "5",
      description: "Versions personnalisées",
      icon: FileText,
      trend: "1 cette semaine",
    },
    {
      title: "Vues Portfolio",
      value: "1.2k",
      description: "Ce mois-ci",
      icon: TrendingUp,
      trend: "+15%",
    },
  ];

  return (
    <div className="space-y-8 animate-in w-full max-w-full overflow-hidden">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Vue d'ensemble</h1>
        <p className="text-muted-foreground text-lg">
          Bienvenue sur votre tableau de bord
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <p className="text-xs text-primary font-medium mt-2">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>Vos dernières modifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Nouveau projet ajouté</p>
                <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Compétence "React" mise à jour</p>
                <p className="text-xs text-muted-foreground">Hier</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">CV généré et téléchargé</p>
                <p className="text-xs text-muted-foreground">Il y a 3 jours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Raccourcis vers vos fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/dashboard/projects/new"
              className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-colors"
            >
              <p className="font-medium">Ajouter un projet</p>
              <p className="text-xs text-muted-foreground">Créez un nouveau projet</p>
            </a>
            <a
              href="/dashboard/cv"
              className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-colors"
            >
              <p className="font-medium">Générer un CV</p>
              <p className="text-xs text-muted-foreground">Créez un CV personnalisé</p>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Section Graphiques */}
      <div className="space-y-6 w-full overflow-hidden">
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        
        {/* Graphique de Popularité - Pleine largeur */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Popularité du Portfolio
            </CardTitle>
            <CardDescription>
              Visiteurs et contacts via les réseaux sociaux
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <PopularityChart data={popularityData} />
          </CardContent>
        </Card>

        {/* Graphiques Performance et Activité */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Graphique de Performance */}
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance Hebdomadaire
              </CardTitle>
              <CardDescription>
                Votre productivité et motivation
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <PerformanceChart data={performanceData} />
            </CardContent>
          </Card>

          {/* Calendrier d'Activité */}
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendrier d'Activité
              </CardTitle>
              <CardDescription>
                Vos contributions quotidiennes (style GitHub)
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <ActivityCalendar data={activityData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bouton de navigation intelligent - Toujours visible */}
      <Button
        onClick={handleScroll}
        size="icon"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-slate-100 text-white dark:text-slate-900 border-2 border-slate-700 dark:border-slate-300 transition-all duration-300 hover:scale-110"
        title={isAtBottom ? "Retour en haut" : "Aller en bas"}
      >
        {isAtBottom ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default Overview;
