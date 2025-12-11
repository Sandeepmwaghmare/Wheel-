import React, { useState } from 'react';
import Wheel from './components/Wheel';
import EmotionDetails from './components/EmotionDetails';
import { SelectedPoint } from './types';

const App: React.FC = () => {
  const [selected, setSelected] = useState<SelectedPoint | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center z-10 shadow-sm sticky top-0">
        <div>
           <h1 className="text-xl md:text-2xl font-serif font-bold text-slate-800 tracking-tight">Art of Living Emotion Wheel</h1>
           <p className="text-xs text-slate-500 mt-1">Interactive Affective Visualization</p>
        </div>
        <a 
          href="#" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          onClick={(e) => { e.preventDefault(); setSelected(null); }}
        >
          Reset View
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full">
        
        {/* Left Side: Visualization */}
        <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8 overflow-y-auto lg:overflow-hidden min-h-[500px]">
          <Wheel 
            onSelect={setSelected} 
            selectedId={selected?.emotion.id ?? null}
          />
          
          {/* Mobile Instruction Overlay (visible only if nothing selected on small screens) */}
          {!selected && (
             <div className="absolute bottom-4 left-0 right-0 text-center lg:hidden pointer-events-none">
                <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-500 shadow-sm border border-slate-200">
                  Tap a circle to explore
                </span>
             </div>
          )}
        </div>

        {/* Right Side: Info Panel */}
        <div className="w-full lg:w-[400px] bg-slate-50 border-l border-slate-200 p-6 lg:p-8 lg:h-[calc(100vh-80px)] overflow-y-auto z-20 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
          <EmotionDetails selected={selected} />
          
          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">About this model</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-2">
              The Geneva Emotion Wheel organizes 20 distinct emotion families on two dimensions: 
              <strong className="text-slate-600"> Valence</strong> (Unpleasant to Pleasant) and 
              <strong className="text-slate-600"> Control/Power</strong> (Low to High).
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Circle size represents the <strong className="text-slate-600">intensity</strong> of the emotional experience.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;