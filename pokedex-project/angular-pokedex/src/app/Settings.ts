export class Settings {
  revealTrainerPokemonOnDefeat: boolean = true;
  revealTypeOnDefeat: boolean = true;
  revealAbilityOnDefeat: boolean = true;
  revealStatsOnDefeat: boolean = true;
  revealLevelMovesOnDefeat: boolean = true;
  revealPrevEvoOnDefeat: boolean = true;
  revealNextEvoOnDefeat: boolean = false;
  revealTMMovesOnDefeat: boolean = false;
  revealLocationsOnDefeat: boolean = true;
}

export const DEFAULT_SETTINGS = new Settings();