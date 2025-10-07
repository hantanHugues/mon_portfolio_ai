import { useState, useEffect } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  startTyping?: boolean;
}

export const useTypewriter = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  startTyping = true 
}: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText("");
      setCurrentIndex(0);
      setIsComplete(false);
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, startTyping]);

  const reset = () => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return { displayText, isComplete, reset };
};
