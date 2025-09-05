'use client';

import { useEffect, useState, useMemo } from 'react';
import { highlightKeyIdentities, HighlightKeyIdentitiesOutput } from '@/ai/flows/highlight-key-identities';
import { useDebounce } from '@/hooks/use-debounce';
import { Card, CardContent } from '@/components/ui/card';

const IdentityHighlight = ({ theta }: { theta: number }) => {
  const [highlight, setHighlight] = useState<HighlightKeyIdentitiesOutput | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const debouncedTheta = useDebounce(theta, 200);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    async function getHighlight() {
      if (debouncedTheta === undefined) return;
      try {
        const result = await highlightKeyIdentities({ theta: debouncedTheta });
        if (result.shouldHighlight) {
          setHighlight(result);
          setIsVisible(true);
        } else {
          setIsVisible(false);
          timeoutId = setTimeout(() => setHighlight(null), 300);
        }
      } catch (error) {
        console.error("Error fetching identity highlight:", error);
        setIsVisible(false);
        timeoutId = setTimeout(() => setHighlight(null), 300);
      }
    }
    getHighlight();
    return () => clearTimeout(timeoutId);
  }, [debouncedTheta]);
  
  const position = useMemo(() => {
    if (!highlight || !highlight.shouldHighlight) return { top: '50%', left: '50%' };
    
    const angle = debouncedTheta;
    const radius = 58; // percentage from center
    const x = 50 + radius * Math.cos(angle);
    const y = 50 - radius * Math.sin(angle);

    return { 
      top: `${y}%`, 
      left: `${x}%`,
      transform: 'translate(-50%, -50%)'
    };
  }, [highlight, debouncedTheta]);

  if (!highlight) {
    return null;
  }

  return (
    <div
      className={`absolute transition-all duration-300 pointer-events-none ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={position}
    >
      <Card className="bg-accent/80 backdrop-blur-sm border-accent text-accent-foreground shadow-lg">
        <CardContent className="p-3">
          <p className="font-code font-bold text-center whitespace-nowrap">{highlight.identity}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentityHighlight;
