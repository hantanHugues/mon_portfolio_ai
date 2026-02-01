import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { HobbiesSection } from "@/components/sections/HobbiesSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { SectionTransition } from "@/components/ui/SectionTransition";


export default function Portfolio() {
    return (
        <div className="relative">
            <Navigation />
            <HeroSection />
            
            {/* Transitions fluides entre sections */}
            <SectionTransition direction="up" delay={0.2}>
                <ServicesSection />
            </SectionTransition>
            
            <SectionTransition direction="up" delay={0.1}>
                <ProjectsSection />
            </SectionTransition>
            
            <SectionTransition direction="up" delay={0.2}>
                <AchievementsSection />
            </SectionTransition>
            
            <SectionTransition direction="fade" delay={0.2}>
                <HobbiesSection />
            </SectionTransition>
            
            <SectionTransition direction="up" delay={0.3}>
                <ApproachSection />
            </SectionTransition>
            
            <SectionTransition direction="fade" delay={0.2}>
                <ContactSection />
            </SectionTransition>
            
            <SectionTransition direction="fade" delay={0.1}>
                <Footer />
            </SectionTransition>
        </div>
    );
}
