export interface EmotionData {
  id: string;
  name: string;
  color: string;
  angle: number; // Degrees, 0 is typically 3 o'clock in SVG, but we will adjust logic
  quadrant: 'High Control / Pleasant' | 'Low Control / Pleasant' | 'Low Control / Unpleasant' | 'High Control / Unpleasant';
}

export interface SelectedPoint {
  emotion: EmotionData;
  intensity: number; // 1 to 4 (1 being smallest/inner, 4 being largest/outer)
  value: number; // 0-100%
}
