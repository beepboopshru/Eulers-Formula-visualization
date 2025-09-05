'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type HighlightResult = {
  identity: string;
  shouldHighlight: boolean;
};

const IdentityHighlight = ({ theta }: { theta: number }) => {
  const [highlight, setHighlight] = useState<HighlightResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const threshold = 0.1; 
    const currentTheta = theta % (2 * Math.PI);

    let identity = '';
    let shouldHighlight = false;

    if (Math.abs(currentTheta - 0) < threshold || Math.abs(currentTheta - 2 * Math.PI) < threshold) {
      identity = 'e^(i*0) = 1';
      shouldHighlight = true;
    } else if (Math.abs(currentTheta - Math.PI / 2) < threshold) {
      identity = 'e^(i*π/2) = i';
      shouldHighlight = true;
    } else if (Math.abs(currentTheta - Math.PI) < threshold) {
      identity = "e^(i*π) = -1"; 
      shouldHighlight = true;
    } else if (Math.abs(currentTheta - (3 * Math.PI) / 2) < threshold) {
      identity = 'e^(i*3π/2) = -i';
      shouldHighlight = true;
    }

    let timeoutId: NodeJS.Timeout;
    if (shouldHighlight) {
      setHighlight({ identity, shouldHighlight });
      setIsVisible(true);
    } else {
      setIsVisible(false);
      timeoutId = setTimeout(() => setHighlight(null), 300);
    }
    
    return () => clearTimeout(timeoutId);
  }, [theta]);
  
  const position = useMemo(() => {
    if (!highlight || !highlight.shouldHighlight) return { top: '50%', left: '50%' };
    
    const radius = 58; // percentage from center
    const x = 50 + radius * Math.cos(theta);
    const y = 50 - radius * Math.sin(theta);

    return { 
      top: `${y}%`, 
      left: `${x}%`,
      transform: 'translate(-50%, -50%)'
    };
  }, [highlight, theta]);

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
