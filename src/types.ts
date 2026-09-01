export type AppScene = 
  | 'opening' 
  | 'catch_minigame'
  | 'pokeball_opening' 
  | 'letter' 
  | 'mega_evolution' 
  | 'celebration';

export interface SoundOptions {
  muted: boolean;
}
