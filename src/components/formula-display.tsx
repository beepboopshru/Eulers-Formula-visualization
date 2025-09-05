import React from 'react';

type FormulaDisplayProps = {
  theta: number;
};

const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ theta }) => {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  return (
    <div className="text-center p-4 rounded-lg bg-background/50 border">
      <p className="text-lg md:text-xl font-code tracking-wider">
        e<sup className='font-headline'>iθ</sup> = cos(θ) + i sin(θ)
      </p>
      <div className="mt-4 text-base md:text-lg space-y-2 font-code">
        <p>θ = {theta.toFixed(2)} rad</p>
        <p>
          e<sup className='font-headline'>i({theta.toFixed(2)})</sup> = {cosTheta.toFixed(2)} + i({sinTheta.toFixed(2)})
        </p>
      </div>
    </div>
  );
};

export default FormulaDisplay;
