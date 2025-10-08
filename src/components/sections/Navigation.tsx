import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MotionDiv } from "@/components/ui/motion";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détecter quelle section est actuellement visible
      if (location.pathname === '/') {
        const sections = ['hero', 'projects', 'services', 'approach', 'contact'];
        const scrollPosition = window.scrollY + 100; // Offset pour la navigation fixe
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = window.scrollY + rect.top;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Gérer la navigation depuis les URLs avec hash et réinitialiser l'état
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          setActiveSection(sectionId);
        }
      }, 100);
    } else if (location.pathname !== '/') {
      // Réinitialiser l'état quand on quitte la page principale
      setActiveSection('');
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    // Si on n'est pas sur la page principale, naviguer d'abord vers la page principale
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = [
    { id: 'projects', label: 'Projets' },
    { id: 'services', label: 'Services' },
    { id: 'approach', label: 'Approche' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <MotionDiv
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' 
          : 'bg-background/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <img 
                src="/images/logoHANTAN.png" 
                alt="HANTAN Logo" 
                width="32" 
                height="32" 
                className="rounded-lg"
              />
            </div>
            <span className="font-bold text-xl text-foreground" style={{ fontFamily: "'Comfortaa', sans-serif" }}>
              Mr. HANTAN
            </span>
          </Link>
        </MotionDiv>
        
        {/* Navigation Items */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <MotionDiv
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <MotionDiv
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </MotionDiv>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Link to="/remerciements">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`transition-all duration-300 ${
                    location.pathname === '/remerciements' 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  Remerciements
                </Button>
              </Link>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <ThemeToggle />
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  Admin
                </Button>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};
