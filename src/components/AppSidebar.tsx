import { LayoutDashboard, FolderKanban, Award, FileText, Settings, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MotionDiv } from "@/components/ui/motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigationItems = [
  {
    title: "Vue d'ensemble",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projets",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Compétences",
    url: "/dashboard/skills",
    icon: Award,
  },
  {
    title: "Générateur CV",
    url: "/dashboard/cv",
    icon: FileText,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  onExpandedChange?: (expanded: boolean) => void;
  isExpanded?: boolean;
}

export function AppSidebar({ onExpandedChange, isExpanded: externalExpanded }: AppSidebarProps = {}) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = externalExpanded !== undefined ? externalExpanded : internalExpanded;

  const handleMouseEnter = () => {
    if (externalExpanded === undefined) {
      setInternalExpanded(true);
    }
    onExpandedChange?.(true);
  };

  const handleMouseLeave = () => {
    if (externalExpanded === undefined) {
      setInternalExpanded(false);
    }
    onExpandedChange?.(false);
  };

  return (
    <MotionDiv
      className="h-full bg-gradient-to-b from-background/95 via-background/98 to-background/95 backdrop-blur-xl z-40 flex flex-col relative"
      initial={{ width: "6rem" }}
      animate={{ width: isExpanded ? "16rem" : "6rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bordure droite subtile */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
      {/* Header */}
      <MotionDiv 
        className="p-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Séparateur subtil en bas */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
        <div className={`flex items-center gap-3 ${!isExpanded ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-base" style={{ fontFamily: "'Comfortaa', sans-serif" }}>H</span>
          </div>
          <MotionDiv
            className="flex flex-col overflow-hidden"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              x: isExpanded ? 0 : -10
            }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
          >
            <span className="font-bold text-foreground text-sm whitespace-nowrap" style={{ fontFamily: "'Comfortaa', sans-serif" }}>
              HANTAN Admin
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Tableau de bord
            </span>
          </MotionDiv>
        </div>
      </MotionDiv>

      {/* Navigation */}
      <div className={`flex-1 py-6 px-3 flex flex-col justify-center relative ${!isExpanded ? 'items-center space-y-3' : 'items-stretch space-y-1'}`}>
        {/* Effet de glow subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        {navigationItems.map((item, index) => (
          <MotionDiv
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            <NavLink
              to={item.url}
              end={item.url === "/dashboard"}
              className={({ isActive }) =>
                `group relative flex items-center transition-all duration-300 ${
                  !isExpanded 
                    ? 'w-14 h-14 justify-center rounded-2xl px-0 py-0' 
                    : 'justify-start rounded-xl px-3 py-2.5 gap-3'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/8 to-primary/4 text-primary shadow-sm backdrop-blur-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    isActive ? 'bg-primary text-white shadow-lg' : 'group-hover:bg-muted'
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>

                  <MotionDiv
                    className="flex flex-col overflow-hidden"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ 
                      opacity: isExpanded ? 1 : 0,
                      width: isExpanded ? "auto" : 0
                    }}
                    transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
                  >
                    <span className="font-medium text-sm whitespace-nowrap">
                      {item.title}
                    </span>
                  </MotionDiv>

                  {isActive && (
                    <MotionDiv
                      className={`absolute top-1/2 -translate-y-1/2 bg-primary ${
                        !isExpanded 
                          ? 'right-1 w-1.5 h-1.5 rounded-full' 
                          : 'right-2 w-1 h-1 rounded-full'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </MotionDiv>
        ))}
      </div>

      {/* Footer */}
      <MotionDiv 
        className={`p-4 relative ${!isExpanded ? 'flex justify-center' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Séparateur subtil en haut */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
        <div className={`flex items-center ${!isExpanded ? 'justify-center flex-col space-y-3' : 'justify-between'}`}>
          {/* Avatar utilisateur - seulement quand étendu */}
          {isExpanded && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-white" />
            </div>
          )}

          {/* Boutons d'action */}
          <div className={`flex items-center gap-2 ${!isExpanded ? 'flex-col space-y-2' : ''}`}>
            {/* Bouton déconnexion */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-red-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                title="Se déconnecter"
              >
                <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-red-400 group-hover:rotate-12 transition-all duration-200" />
              </button>
            </MotionDiv>

            {/* Bouton de changement de thème */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ThemeToggle />
            </MotionDiv>
          </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}
