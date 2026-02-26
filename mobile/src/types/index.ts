// Restaurant & Menu Types for pmap

export interface MenuItem {
  id: string;
  name: string;
  protein: number;   // grams
  calories: number;
  fat: number;       // grams
  carbs: number;     // grams
  price: number;     // yen
}

export interface Restaurant {
  id: string;
  name: string;
  genre: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  walkMinutes: number;
  isOpen: boolean;
  menus: MenuItem[];
  maxProtein: number;  // highest protein menu item
}

export type ProteinLevel = 'high' | 'mid' | 'low';

export function getProteinLevel(protein: number): ProteinLevel {
  if (protein >= 30) return 'high';
  if (protein >= 15) return 'mid';
  return 'low';
}

export type FilterGenre = '全て' | '和食' | '洋食' | '中華' | 'ファストフード' | 'カフェ';
