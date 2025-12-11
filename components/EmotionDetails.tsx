import React from 'react';
import { SelectedPoint } from '../types';

interface EmotionDetailsProps {
  selected: SelectedPoint | null;
}

const EmotionDetails: React.FC<EmotionDetailsProps> = ({ selected }) => {
  if (!selected) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 p-8 text-center border border-slate-200 rounded-2xl bg-white shadow-sm">
        <div className="max-w-xs">
          <p className="mb-2 text-2xl">👆</p>
          <p className="text-sm font-medium">Select an emotion on the wheel to view details.</p>
        </div>
      </div>
    );
  }

  const { emotion, intensity, value } = selected;

  return (
    <div 
      className="h-full flex flex-col justify-center p-8 border border-slate-200 rounded-2xl bg-white shadow-lg transition-all duration-300"
      style={{ borderTop: `6px solid ${emotion.color}` }}
    >
      <div className="mb-6">
        <h2 className="text-4xl font-serif font-bold text-slate-800 mb-1">{emotion.name}</h2>
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold rounded-full">
          {emotion.quadrant}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-500 font-medium">Intensity Level</span>
            <span className="text-2xl font-bold text-slate-800">{intensity} <span className="text-base font-normal text-slate-400">/ 4</span></span>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-full transition-colors duration-300 ${
                  i <= intensity ? '' : 'bg-slate-100'
                }`}
                style={{ backgroundColor: i <= intensity ? emotion.color : undefined }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
             <span className="text-slate-500 font-medium">Metric Value</span>
             <span className="text-2xl font-bold text-slate-800">{value}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${value}%`, backgroundColor: emotion.color }}
            />
          </div>
        </div>
      
        <div className="pt-4 border-t border-slate-100 mt-4">
             <p className="text-slate-500 text-sm italic">
                "Feeling {emotion.name.toLowerCase()} indicates a state of {emotion.quadrant.toLowerCase()}."
             </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionDetails;
