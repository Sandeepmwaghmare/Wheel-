import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { EMOTIONS, INTENSITY_LEVELS, MAX_RADIUS, INNER_RADIUS_OFFSET, CIRCLE_MAX_SIZE, CIRCLE_MIN_SIZE } from '../constants';
import { SelectedPoint } from '../types';

interface WheelProps {
  onSelect: (data: SelectedPoint) => void;
  selectedId: string | null;
}

const Wheel: React.FC<WheelProps> = ({ onSelect, selectedId }) => {
  const [hovered, setHovered] = useState<{ id: string; intensity: number } | null>(null);

  const width = 700;
  const height = 700;
  const centerX = width / 2;
  const centerY = height / 2;

  // Generate the circles data
  const circles = useMemo(() => {
    const data: Array<{
      id: string;
      emotionId: string;
      name: string;
      cx: number;
      cy: number;
      r: number;
      fill: string;
      intensity: number;
      value: number;
      data: any; // original emotion object
    }> = [];

    const radiusScale = d3.scaleLinear()
      .domain([1, INTENSITY_LEVELS])
      .range([INNER_RADIUS_OFFSET, MAX_RADIUS]);

    const sizeScale = d3.scaleLinear()
      .domain([1, INTENSITY_LEVELS])
      .range([CIRCLE_MIN_SIZE, CIRCLE_MAX_SIZE]);

    // Intensity values (percentage) just for display
    const valueScale = d3.scaleLinear()
        .domain([1, INTENSITY_LEVELS])
        .range([25, 100]);

    EMOTIONS.forEach((emotion) => {
      for (let i = 1; i <= INTENSITY_LEVELS; i++) {
        // Convert degrees to radians. Adjust -90 for SVG orientation if needed, 
        // but here we used standard unit circle logic in constants, so we just convert.
        // Actually, SVG 0 is 3 o'clock (0 rads). 
        // Our constants are standard degrees (0 = 3 o'clock, -90 = 12 o'clock).
        const angleRad = (emotion.angle * Math.PI) / 180;
        
        // Calculate distance from center based on intensity
        // Intensity 1 is closest to center? In Geneva wheel, small circles are inner, large are outer.
        // Actually looking at image: Largest circles are OUTER. Smallest are INNER.
        // So Intensity 1 (Small) -> Inner Radius. Intensity 4 (Large) -> Outer Radius.
        const rPosition = radiusScale(i);
        const circleSize = sizeScale(i);

        const x = centerX + rPosition * Math.cos(angleRad);
        const y = centerY + rPosition * Math.sin(angleRad);

        data.push({
          id: `${emotion.id}-${i}`,
          emotionId: emotion.id,
          name: emotion.name,
          cx: x,
          cy: y,
          r: circleSize,
          fill: emotion.color,
          intensity: i,
          value: valueScale(i),
          data: emotion,
        });
      }
    });
    return data;
  }, [centerX, centerY]);

  // Labels calculation
  const labels = useMemo(() => {
    return EMOTIONS.map(emotion => {
       const labelRadius = MAX_RADIUS + 40;
       const angleRad = (emotion.angle * Math.PI) / 180;
       const x = centerX + labelRadius * Math.cos(angleRad);
       const y = centerY + labelRadius * Math.sin(angleRad);
       
       // Determine text anchor based on side of wheel to avoid overlap
       let textAnchor = 'middle';
       if (x > centerX + 20) textAnchor = 'start';
       if (x < centerX - 20) textAnchor = 'end';

       return {
         id: `label-${emotion.id}`,
         text: emotion.name,
         x,
         y,
         textAnchor,
         fill: emotion.color
       };
    });
  }, [centerX, centerY]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[600px] h-auto drop-shadow-xl"
        style={{ maxHeight: '80vh' }}
      >
        {/* Axes */}
        <g className="opacity-20 stroke-slate-400" strokeWidth="1">
          <line x1={centerX} y1={50} x2={centerX} y2={height - 50} />
          <line x1={50} y1={centerY} x2={width - 50} y2={centerY} />
        </g>
        
        {/* Axis Labels */}
        <g className="font-serif text-[10px] tracking-widest font-bold fill-slate-500 uppercase">
          <text x={centerX} y={30} textAnchor="middle">High Control</text>
          <text x={centerX} y={height - 20} textAnchor="middle">Low Control</text>
          <text x={width - 20} y={centerY + 4} textAnchor="end">Pleasant</text>
          <text x={20} y={centerY + 4} textAnchor="start">Unpleasant</text>
        </g>

        {/* Emotion Labels */}
        <g className="font-sans text-[11px] font-medium fill-slate-600">
          {labels.map((label) => (
            <text
              key={label.id}
              x={label.x}
              y={label.y + 4} // slight optical adjustment
              textAnchor={label.textAnchor}
              className="transition-all duration-300"
              style={{
                 fill: label.text === selectedId ? '#000' : undefined,
                 fontWeight: label.text === selectedId ? 'bold' : 'normal',
                 opacity: hovered && !hovered.id.startsWith(label.id.replace('label-', '')) ? 0.3 : 1
              }}
            >
              {label.text}
            </text>
          ))}
        </g>

        {/* Circles */}
        <g>
          {circles.map((circle) => {
            const isSelected = selectedId === circle.emotionId;
            const isHovered = hovered?.id === circle.id;
            const isDimmed = hovered && hovered.emotionId !== circle.emotionId;

            return (
              <circle
                key={circle.id}
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                fill={circle.fill}
                className="cursor-pointer transition-all duration-300 ease-out"
                style={{
                  opacity: isDimmed ? 0.2 : (isHovered || isSelected ? 1 : 0.8),
                  transformOrigin: `${circle.cx}px ${circle.cy}px`,
                  transform: isHovered || isSelected ? 'scale(1.2)' : 'scale(1)',
                  stroke: isSelected ? '#333' : 'none',
                  strokeWidth: isSelected ? 2 : 0
                }}
                onMouseEnter={() => setHovered({ id: circle.id, intensity: circle.intensity, ...circle })}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect({
                  emotion: circle.data,
                  intensity: circle.intensity,
                  value: circle.value
                })}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Wheel;
