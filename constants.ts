import { EmotionData } from './types';

// The wheel has 20 spokes. 360 / 20 = 18 degrees per spoke.
// We need to align them to match the reference image.
// Top is -90deg (or 270). Right is 0. Bottom is 90. Left is 180.

export const EMOTIONS: EmotionData[] = [
  // High Control / Pleasant (Top Rightish)
  { id: 'pride', name: 'Pride', color: '#f87171', angle: -72, quadrant: 'High Control / Pleasant' }, // Red-ish
  { id: 'elation', name: 'Elation', color: '#fb923c', angle: -54, quadrant: 'High Control / Pleasant' }, // Orange
  { id: 'joy', name: 'Joy', color: '#facc15', angle: -36, quadrant: 'High Control / Pleasant' }, // Yellow-Gold
  { id: 'satisfaction', name: 'Satisfaction', color: '#fef08a', angle: -18, quadrant: 'High Control / Pleasant' }, // Light Yellow

  // Low Control / Pleasant (Bottom Rightish)
  { id: 'relief', name: 'Relief', color: '#d9f99d', angle: 18, quadrant: 'Low Control / Pleasant' }, // Lime
  { id: 'hope', name: 'Hope', color: '#a3e635', angle: 36, quadrant: 'Low Control / Pleasant' }, // Green
  { id: 'interest', name: 'Interest', color: '#4ade80', angle: 54, quadrant: 'Low Control / Pleasant' }, // Green
  { id: 'surprise', name: 'Surprise', color: '#2dd4bf', angle: 72, quadrant: 'Low Control / Pleasant' }, // Teal

  // Low Control / Unpleasant (Bottom Leftish)
  { id: 'sadness', name: 'Sadness', color: '#60a5fa', angle: 108, quadrant: 'Low Control / Unpleasant' }, // Blue
  { id: 'fear', name: 'Fear', color: '#818cf8', angle: 126, quadrant: 'Low Control / Unpleasant' }, // Indigo
  { id: 'shame', name: 'Shame', color: '#a78bfa', angle: 144, quadrant: 'Low Control / Unpleasant' }, // Purple
  { id: 'guilt', name: 'Guilt', color: '#c084fc', angle: 162, quadrant: 'Low Control / Unpleasant' }, // Violet

  // High Control / Unpleasant (Top Leftish)
  { id: 'envy', name: 'Envy', color: '#e879f9', angle: 198, quadrant: 'High Control / Unpleasant' }, // Fuschia
  { id: 'disgust', name: 'Disgust', color: '#fb7185', angle: 216, quadrant: 'High Control / Unpleasant' }, // Rose
  { id: 'contempt', name: 'Contempt', color: '#f43f5e', angle: 234, quadrant: 'High Control / Unpleasant' }, // Red-Pink
  { id: 'anger', name: 'Anger', color: '#ef4444', angle: 252, quadrant: 'High Control / Unpleasant' }, // Red
  
  // Note: Gaps are intentional in the Geneva wheel structure (the axes lines usually take up space), 
  // but for this simplified interactive viz, we distribute roughly around the clock 
  // skipping the exact 0, 90, 180, 270 degree marks to leave room for labels.
];

export const INTENSITY_LEVELS = 4;
export const MAX_RADIUS = 280; // SVG coordinate space
export const INNER_RADIUS_OFFSET = 60; // How far from center the first circle starts
export const CIRCLE_MAX_SIZE = 28;
export const CIRCLE_MIN_SIZE = 8;
