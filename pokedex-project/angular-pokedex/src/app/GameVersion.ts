export enum GameVersion {
  AlphaSapphire = "alphasapphire",
  Black2 = "black2",
  Black = "black",
  Blue = "blue",
  Crystal = "crystal",
  Diamond = "diamond",
  Emerald = "emerald",
  FireRed = "firered",
  Gold = "gold",
  HeartGold = "heartgold",
  LeafGreen = "leafgreen",
  Moon = "moon",
  OmegaRuby = "omegaruby",
  Pearl = "pearl",
  Platinum = "platinum",
  Red = "red",
  Ruby = "ruby",
  Sapphire = "sapphire",
  Silver = "silver",
  SoulSilver = "soulsilver",
  Sun = "sun",
  UltraMoon = "ultramoon",
  UltraSun = "ultrasun",
  White2 = "white2",
  White = "white",
  X = "x",
  Yellow = "yellow",
  Y = "y"
}

export const gameVersionMap: Record<string, { version: GameVersion; generation: number }> = {
  red: { version: GameVersion.Red, generation: 1 },
  blue: { version: GameVersion.Blue, generation: 1 },
  green: { version: GameVersion.Blue, generation: 1 }, // fallback for JP Green
  yellow: { version: GameVersion.Yellow, generation: 1 },

  gold: { version: GameVersion.Gold, generation: 2 },
  silver: { version: GameVersion.Silver, generation: 2 },
  crystal: { version: GameVersion.Crystal, generation: 2 },

  ruby: { version: GameVersion.Ruby, generation: 3 },
  sapphire: { version: GameVersion.Sapphire, generation: 3 },
  emerald: { version: GameVersion.Emerald, generation: 3 },
  firered: { version: GameVersion.FireRed, generation: 3 },
  leafgreen: { version: GameVersion.LeafGreen, generation: 3 },

  diamond: { version: GameVersion.Diamond, generation: 4 },
  pearl: { version: GameVersion.Pearl, generation: 4 },
  platinum: { version: GameVersion.Platinum, generation: 4 },
  heartgold: { version: GameVersion.HeartGold, generation: 4 },
  soulsilver: { version: GameVersion.SoulSilver, generation: 4 },

  black: { version: GameVersion.Black, generation: 5 },
  white: { version: GameVersion.White, generation: 5 },
  black2: { version: GameVersion.Black2, generation: 5 },
  white2: { version: GameVersion.White2, generation: 5 },

  x: { version: GameVersion.X, generation: 6 },
  y: { version: GameVersion.Y, generation: 6 },
  omegaruby: { version: GameVersion.OmegaRuby, generation: 6 },
  alphasapphire: { version: GameVersion.AlphaSapphire, generation: 6 },

  sun: { version: GameVersion.Sun, generation: 7 },
  moon: { version: GameVersion.Moon, generation: 7 },
  ultrasun: { version: GameVersion.UltraSun, generation: 7 },
  ultramoon: { version: GameVersion.UltraMoon, generation: 7 },
};
