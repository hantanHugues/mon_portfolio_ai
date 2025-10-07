import { useTypewriter } from "@/hooks/useTypewriter";
import { MotionSpan } from "@/components/ui/motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  startTyping?: boolean;
  className?: string;
  showCursor?: boolean;
  cursorClassName?: string;
  style?: React.CSSProperties;
}

export const TypewriterText = ({
  text,
  speed = 100,
  delay = 0,
  startTyping = true,
  className = "",
  showCursor = true,
  cursorClassName = "",
  style
}: TypewriterTextProps) => {
  const { displayText, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    startTyping
  });

  return (
    <span className={className} style={style}>
      {displayText}
      {showCursor && !isComplete && (
        <MotionSpan
          className={`inline-block w-0.5 h-[1em] bg-current ml-1 ${cursorClassName}`}
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      )}
    </span>
  );
};
