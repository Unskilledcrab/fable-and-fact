export interface Character {
  id: string;
  name: string;
  role: string;
  faction: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  personalLore: string;
  secret: string;
  objective: string;
  allies: string[];
}

export interface StoryBeat {
  time: string;
  event: string;
}

export interface Mystery {
  id: string;
  title: string;
  setting: string;
  publicLore: string;
  premise: string;
  storyline: StoryBeat[];
  characters: Character[];
}

export interface AppState {
  currentMystery: Mystery | null;
  theme: string;
  playerCount: number;
}
