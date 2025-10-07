import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { MotionDiv } from "@/components/ui/motion";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DashboardLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-muted/20 flex">
      <div className="fixed left-0 top-0 h-screen z-40">
        <AppSidebar 
          onExpandedChange={setSidebarExpanded}
          isExpanded={sidebarExpanded}
        />
      </div>
      
      {/* Main Content */}
      <MotionDiv 
        className="flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarExpanded ? '16rem' : '6rem' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header amélioré */}
        <header className="h-16 bg-background/95 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6 relative">
          {/* Séparateur subtil en bas */}
          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 w-64 bg-muted/20 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 focus:bg-muted/30 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-2 pl-3 border-l border-border/30">
             
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white font-bold text-xs" style={{ fontFamily: "'Comfortaa', sans-serif" }}>H</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium">HANTAN Hugues</span>
                <span className="text-xs text-muted-foreground">Administrateur</span>
              </div>
            </div>
          </div>
        </header>


        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </MotionDiv>
        </main>
      </MotionDiv>
    </div>
  );
}
