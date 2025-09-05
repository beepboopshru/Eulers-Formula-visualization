'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import dynamic from 'next/dynamic';
import FormulaDisplay from '@/components/formula-display';
import IdentityHighlight from '@/components/identity-highlight';
import { Label } from '@/components/ui/label';

const EulerVisualization = dynamic(() => import('@/components/euler-visualization'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center"><p>Loading Visualization...</p></div>,
});

export default function Home() {
  const [theta, setTheta] = useState(0);
  const [speed, setSpeed] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(5);
  const [rotation, setRotation] = useState({ x: Math.PI / 6, y: Math.PI / 4 });

  useEffect(() => {
    let animationFrameId: number;
    if (isPlaying) {
      const animate = () => {
        setTheta(prevTheta => (prevTheta + speed * 0.01) % (2 * Math.PI));
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, speed]);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prevZoom => direction === 'in' ? Math.max(2, prevZoom - 1) : Math.min(10, prevZoom + 1));
  };

  const handleReset = () => {
    setTheta(0);
    setZoom(5);
    setRotation({ x: Math.PI / 6, y: Math.PI / 4 });
    setIsPlaying(true);
  };

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row items-center justify-center bg-background p-4 lg:p-8 gap-8 overflow-hidden">
      <div className="relative w-full lg:w-3/4 h-[60vh] lg:h-[80vh] max-w-4xl max-h-[80vh] aspect-square">
        <EulerVisualization theta={theta} zoom={zoom} rotation={rotation} setRotation={setRotation} />
        <IdentityHighlight theta={theta} />
      </div>

      <div className="w-full lg:w-1/4 lg:max-w-sm flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">Euler's Formula</CardTitle>
          </CardHeader>
          <CardContent>
            <FormulaDisplay theta={theta} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theta-slider">θ (Theta): {(theta * 180 / Math.PI).toFixed(0)}°</Label>
              <Slider
                id="theta-slider"
                min={0}
                max={2 * Math.PI}
                step={0.01}
                value={[theta]}
                onValueChange={([val]) => setTheta(val)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed-slider">Speed: {speed.toFixed(2)}</Label>
              <Slider
                id="speed-slider"
                min={0}
                max={2}
                step={0.1}
                value={[speed]}
                onValueChange={([val]) => setSpeed(val)}
              />
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="group hover:bg-accent/20 transition-colors">
                {isPlaying ? <Pause className="group-hover:scale-110 transition-transform" /> : <Play className="group-hover:scale-110 transition-transform"/>}
              </Button>
               <Button variant="outline" size="icon" onClick={() => handleZoom('in')} className="group hover:bg-accent/20 transition-colors">
                 <ZoomIn className="group-hover:scale-110 transition-transform"/>
              </Button>
               <Button variant="outline" size="icon" onClick={() => handleZoom('out')} className="group hover:bg-accent/20 transition-colors">
                 <ZoomOut className="group-hover:scale-110 transition-transform"/>
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset} className="group hover:bg-accent/20 transition-colors">
                <RotateCcw className="group-hover:rotate-[-45deg] transition-transform"/>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
