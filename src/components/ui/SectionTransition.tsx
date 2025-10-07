import { MotionDiv } from "@/components/ui/motion";
import { useInView } from "@/hooks/useInView";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export const SectionTransition = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}: SectionTransitionProps) => {
  const { ref, isInView } = useInView({ margin: "-10%" });

  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 60 };
      case "down":
        return { opacity: 0, y: -60 };
      case "left":
        return { opacity: 0, x: -60 };
      case "right":
        return { opacity: 0, x: 60 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case "up":
        return { opacity: 1, y: 0 };
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
        return { opacity: 1, x: 0 };
      case "right":
        return { opacity: 1, x: 0 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <MotionDiv
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </MotionDiv>
  );
};
