// pmap Theme Constants

export const Colors = {
  // Backgrounds
  bgPrimary: '#0a0a0f',
  bgSecondary: '#111118',
  bgCard: 'rgba(255, 255, 255, 0.04)',
  bgCardHover: 'rgba(255, 255, 255, 0.08)',

  // Text
  textPrimary: '#f0f0f5',
  textSecondary: 'rgba(240, 240, 245, 0.65)',
  textMuted: 'rgba(240, 240, 245, 0.4)',

  // Protein Levels
  proteinHigh: '#22c55e',
  proteinHighBg: 'rgba(34, 197, 94, 0.12)',
  proteinMid: '#facc15',
  proteinMidBg: 'rgba(250, 204, 21, 0.12)',
  proteinLow: '#f87171',
  proteinLowBg: 'rgba(248, 113, 113, 0.12)',

  // Accent
  green400: '#4ade80',
  green500: '#22c55e',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
};

export const ProteinColors = {
  high: { text: Colors.proteinHigh, bg: Colors.proteinHighBg },
  mid: { text: Colors.proteinMid, bg: Colors.proteinMidBg },
  low: { text: Colors.proteinLow, bg: Colors.proteinLowBg },
};

// Shinjuku station center coordinates
export const SHINJUKU_CENTER = {
  latitude: 35.6896,
  longitude: 139.6922,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};
