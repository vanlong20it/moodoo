import React, { useEffect, useState } from 'react';

interface BreathingExerciseProps {
  secondsIn: number;
  secondsHold: number;
  secondsOut: number;
  onComplete: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  secondsIn,
  secondsHold,
  secondsOut,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [scale, setScale] = useState(1);
  const [text, setText] = useState('Hít vào...');
  const [timeLeft, setTimeLeft] = useState(secondsIn);
  const [cycles, setCycles] = useState(0);
  const MAX_CYCLES = 3;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const runPhase = () => {
      if (cycles >= MAX_CYCLES) {
        onComplete();
        return;
      }

      if (phase === 'in') {
        setText('Hít vào...');
        setScale(1.5); // Expand
        timer = setTimeout(() => {
          if (secondsHold > 0) {
            setPhase('hold');
          } else {
            setPhase('out');
          }
        }, secondsIn * 1000);
      } else if (phase === 'hold') {
        setText('Giữ hơi...');
        setScale(1.5); // Stay expanded
        timer = setTimeout(() => {
          setPhase('out');
        }, secondsHold * 1000);
      } else if (phase === 'out') {
        setText('Thở ra...');
        setScale(1.0); // Contract
        timer = setTimeout(() => {
          setCycles((c) => c + 1);
          setPhase('in');
        }, secondsOut * 1000);
      }
    };

    runPhase();

    return () => clearTimeout(timer);
  }, [phase, cycles, secondsIn, secondsHold, secondsOut, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-[2000ms] ease-in-out shadow-xl ${
          phase === 'out' ? 'bg-blue-200' : 'bg-green-300'
        }`}
        style={{
          width: '200px',
          height: '200px',
          transform: `scale(${scale})`,
          transitionDuration: phase === 'in' ? `${secondsIn}s` : phase === 'out' ? `${secondsOut}s` : '0.5s'
        }}
      >
        <span className="text-xl font-bold text-gray-700 pointer-events-none select-none animate-fade-in">
           {/* Static text inside bubble to prevent jitter, state text is below */}
           🌬️
        </span>
      </div>
      
      <div className="mt-12 text-center h-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{text}</h2>
        <p className="text-gray-500 text-sm">Lần {cycles + 1} / {MAX_CYCLES}</p>
      </div>
    </div>
  );
};

export default BreathingExercise;