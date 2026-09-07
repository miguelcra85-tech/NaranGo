export interface Flavor {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'citrus' | 'tropical' | 'wellness' | 'energy';
  price: number;
  originalPrice?: number;
  calories: number;
  volume: string;
  badge?: string;
  color: string;
  glowColor: string;
  glowHex: string;
  accentColor: string;
  tagline: string;
  imageFile?: string;
  notes: string[];
  ingredients: string[];
  isDarkTheme?: boolean; // For BlueBerry Energy
}

export interface CartItem {
  flavor: Flavor;
  quantity: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  iconName: string;
  color: string;
}
