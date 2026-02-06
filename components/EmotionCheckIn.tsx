import React from 'react';
import { EmotionType } from '../types';
import { EMOTION_COLORS, EMOTION_ICONS, EMOTION_LABELS_VI } from '../constants';

interface EmotionCheckInProps {
  onSelect: (emotion: EmotionType) => void;
}

const EmotionCheckIn: React.FC<EmotionCheckInProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Hôm nay con cảm thấy thế nào?
      </h2>
      <div className="grid grid-cols-2 gap-4 px-4">
        {Object.values(EmotionType).map((emotion) => (
          <button
            key={emotion}
            onClick={() => onSelect(emotion)}
            className={`${EMOTION_COLORS[emotion]} ${
                emotion === EmotionType.SURPRISED ? 'col-span-2 mx-auto w-1/2' : ''
            } border-b-4 active:border-b-0 active:translate-y-1 rounded-2xl p-6 flex flex-col items-center justify-center transition-all h-32 md:h-40`}
          >
            <div className="mb-2 text-white/90 drop-shadow-sm">
                {EMOTION_ICONS[emotion]}
            </div>
            <span className="font-bold text-lg md:text-xl">{EMOTION_LABELS_VI[emotion]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionCheckIn;