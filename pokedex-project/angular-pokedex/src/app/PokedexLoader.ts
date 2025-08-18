import { PokedexContext } from './PokedexContext';
import { learned_move, Pokemon } from './Pokemon';
import { Trainer } from './Trainer';
import { PokedexService } from './pokedex.service';

export class PokedexLoader {
  lastFileRead: string = '';

  constructor() {}

  async parseDex(inputFile: string | File): Promise<PokedexContext> {
    let ctx: PokedexContext = new PokedexContext();

    if (typeof inputFile === 'string') {
      // Remote file path: fetch and parse
      const response = await fetch(inputFile);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${inputFile}`);
      }
      const content = await response.text();

      ctx = PokedexContext.fromJSON(content);
    } else {
      // Local File object: read and parse
      const content = await this.readFileAsText(inputFile);

      if (inputFile.name.endsWith('.log')) {
        ctx = await this.parseLog(content);
      } else if (inputFile.name.endsWith('.pkdx')) {
        ctx = PokedexContext.fromJSON(content);
      } else {
        throw new Error(`Unsupported file type: ${inputFile.name}`);
      }
    }

    return ctx;
  }

  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  async parseLog(fileContent: string): Promise<PokedexContext> {
    let ctx = new PokedexContext();

    fileContent = fileContent.replace(/\r\n|\r/g, '\n');
    const blocks = fileContent.split('\n\n');

    let pokeStrings: string[] = [];
    let evoStrings: string[] = [];
    let tmStrings: string[] = [];
    let moveStrings: string[] = [];
    let tmCompStrings: string[] = [];
    let starterStrings: string[] = [];
    let locationStrings: string[] = [];
    let trainerStrings: string[] = [];
    let defaultDataContext: PokedexContext | undefined;

    for (let block of blocks) {
      const lines = block.trim().split('\n');
      const firstLine = lines[0];
      const label = firstLine.startsWith('-')
        ? firstLine.split('--')[1]
        : firstLine.split(':')[0];
      switch (label) {
        case 'Randomized Evolutions':
          evoStrings = lines.slice(1);
          break;
        case 'Pokemon Base Stats & Types':
          pokeStrings = lines.slice(1);
          break;
        case 'TM Moves':
          tmStrings = lines.slice(1);
          break;
        case 'Pokemon Movesets': // Only the first Pokemon Moveset Block meets this description (Bulbasaur)
          block = block.split(firstLine)[1];
          moveStrings.push(block.trim());
          break;
        case 'TM Compatibility':
          tmCompStrings = lines.slice(1);
          break;
        case 'Random Starters':
          starterStrings = lines.slice(1);
          break;
        case 'Trainers Pokemon':
          block = block.split(firstLine)[1];
          trainerStrings.push(block.trim());
          break;
        case 'Wild Pokemon':
          block = block.split(firstLine)[1];
          locationStrings.push(block.trim());
          break;
        default: //All other Pokemon Movesets appear as their own independent blocks.
          if (firstLine.match(/\d{3} .* ->/) && !firstLine.startsWith('Set')) {
            moveStrings.push(block);
          } else if (firstLine.trim().match(/^#\d+ \(/)) {
            trainerStrings.push(block);
          } else if (firstLine.startsWith('Set')) {
            locationStrings.push(block);
          }
          break;
      }
    }

    if (
      pokeStrings.length == 0 ||
      evoStrings.length == 0 ||
      moveStrings.length == 0 ||
      tmCompStrings.length == 0
    ) {
      const gen = parseInt(this.getGenerationFromLog(blocks));
      // defaultDataContext = await this.getDefaultDataForGeneration(gen);
    }

    this.parsePokemon(ctx, pokeStrings, defaultDataContext);

    let pokedexByName = new Map<string, Pokemon>();
    for (let mon of ctx.pokedex) {
      pokedexByName.set(mon.name, mon);
    }

    this.parseEvolutions(ctx, evoStrings, pokedexByName, defaultDataContext);
    this.parseLevelUpMoves(ctx, moveStrings, pokedexByName, defaultDataContext);
    this.parseMoveMachines(
      ctx,
      tmCompStrings,
      tmStrings,
      pokedexByName,
      defaultDataContext
    );
    this.parseLocations(ctx, locationStrings, pokedexByName);
    this.parseTrainers(ctx, trainerStrings);
    this.parseStarters(ctx, starterStrings);

    return ctx;
  }

  private parsePokemon(
    ctx: PokedexContext,
    pokeStrings: string[],
    defaultData: PokedexContext | undefined
  ) {
    let labels = '';
    if (pokeStrings.length > 0) {
      labels = pokeStrings[0];
    }

    //Create List and add Base Stats
    for (const pokeString of pokeStrings.slice(1)) {
      let new_mon = Pokemon.createPokemonFromTraits(pokeString, labels);
      //If this is an alt form, set UID to original mon
      if (
        new_mon.name.indexOf('-') !== -1 &&
        ctx.pokedex.find((mon) => new_mon.name.indexOf(mon.name) !== -1) &&
        !new_mon.name.toLowerCase().includes('porygon')
      ) {
        let base_forme = ctx.pokedex.find(
          (mon) => new_mon.name.indexOf(mon.name) !== -1
        );
        new_mon.uid = base_forme!.uid;
        !base_forme!.forms.includes(base_forme!.name) &&
          base_forme!.forms.push(base_forme!.name);
        base_forme!.forms.push(new_mon.name);
        new_mon.forms = base_forme!.forms;
        new_mon.form_num = new_mon.forms.length - 1;
      }
      ctx.pokedex.push(new_mon);
    }
    if (pokeStrings.length == 0 && defaultData) {
      ctx.pokedex = defaultData.pokedex.map((mon) => {
        return Pokemon.createCloneFromTraits(mon);
      });
    }
  }

  private parseEvolutions(
    ctx: PokedexContext,
    evoStrings: string[],
    lookupTable: Map<string, Pokemon>,
    defaultData: PokedexContext | undefined
  ) {
    for (let evString of evoStrings) {
      const names = evString.split(/->|,| and /).map((s) => s.trim());
      for (let name of names) {
        lookupTable.get(name)?.addEvolution(evString);
      }
    }

    //If the log had no data, get Default Evo Data
    if (evoStrings.length == 0 && defaultData) {
      for (let defaultMon of defaultData.pokedex) {
        let mon = lookupTable.get(defaultMon.name);
        if (mon) {
          mon.next_evos = defaultMon.next_evos;
          mon.prev_evos = defaultMon.prev_evos;
        }
      }
    }
  }

  private parseLevelUpMoves(
    ctx: PokedexContext,
    moveStrings: string[],
    lookupTable: Map<string, Pokemon>,
    defaultData: PokedexContext | undefined
  ) {
    //Level Up Moves
    for (let moveString of moveStrings) {
      let mon_name = moveString.substring(4, moveString.indexOf('->') - 1);
      let mon = lookupTable.get(mon_name);
      if (mon) {
        for (let level_line of moveString.split('\n')) {
          if (level_line.match(/Level[ \da-zA-Z:]*/)) {
            let level = level_line.split(/[ :]/)[1].trim();
            let move_name = level_line.split(':')[1].trim();
            let move = { level: +level, move: move_name } as learned_move;
            mon.learn_levels.push(move.level);
            mon.learned_moves.push(move.move);
          }
        }
      }
    }
    if (moveStrings.length == 0 && defaultData) {
      for (let defaultMon of defaultData.pokedex) {
        let mon = lookupTable.get(defaultMon.name);
        if (mon) {
          mon.learn_levels = defaultMon.learn_levels;
          mon.learned_moves = defaultMon.learned_moves;
        }
      }
    }
  }

  private parseMoveMachines(
    ctx: PokedexContext,
    tmCompStrings: string[],
    tmStrings: string[],
    lookupTable: Map<string, Pokemon>,
    defaultData: PokedexContext | undefined
  ) {
    //TMS and Compatibility
    let dexHmTokens: string[] = [];
    for (let tmCompString of tmCompStrings) {
      let mon_name = tmCompString.slice(0, tmCompString.indexOf('|')).trim();
      mon_name = mon_name.slice(mon_name.indexOf(' ')).trim();
      let mon = lookupTable.get(mon_name);
      let tmHmTokens = tmCompString
        .split('|')
        .map((s) => s.trim())
        .filter((s) => s.startsWith('TM') || s.startsWith('HM'));
      let tmTokens = tmHmTokens.filter((s) => s.startsWith('TM'));
      let hmTokens = tmHmTokens.filter((s) => s.startsWith('HM'));
      if (mon) {
        for (let tmString of tmTokens) {
          let [tm, move] = this.parseMoveMachineString(tmString);
          mon.tms.push(tm);
          mon.tm_moves.push(move);
        }
        for (let hmString of hmTokens) {
          let [hm, move] = this.parseMoveMachineString(hmString);
          mon.hms.push(hm);
          mon.hm_moves.push(move);
          !dexHmTokens.includes(hmString) && dexHmTokens.push(hmString);
        }
      }
    }
    if (tmCompStrings.length == 0 && defaultData) {
      if (tmStrings.length > 0) {
        let tm_moves_by_index = ['']; // Kinda hacky, but I want array index to equal TM number
        tm_moves_by_index = tm_moves_by_index.concat(
          tmStrings.map((line) =>
            line.match(/TM\d+ (.*)/) ? line.match(/TM\d+ (.*)/)![1] : ''
          )
        );
        for (let defaultMon of defaultData.pokedex) {
          let mon = lookupTable.get(defaultMon.name);
          if (mon) {
            mon.setTMMovesFromDefault(defaultMon, tm_moves_by_index);
          }
        }
      } else {
        for (let defaultMon of defaultData.pokedex) {
          let mon = lookupTable.get(defaultMon.name);
          if (mon) {
            mon.setTMMovesFromDefault(defaultMon);
          }
        }
      }
    }

    //Add TMs and HMs to the world dex
    for (let tmString of tmStrings) {
      let [tm, move] = this.parseMoveMachineString(tmString);
      ctx.tmIds.push(tm);
      ctx.tmMoves.push(move);
    }
    dexHmTokens.sort();
    for (let hmString of dexHmTokens) {
      let [hm, move] = this.parseMoveMachineString(hmString);
      ctx.hmIds.push(hm);
      ctx.hmMoves.push(move);
    }
  }

  private parseLocations(
    ctx: PokedexContext,
    locationStrings: string[],
    lookupTable: Map<string, Pokemon>
  ) {
    for (let locationString of locationStrings) {
      const locationMatch = locationString.match(
        /Set #\d+ - (.*?)(?:, Table|\s*\(rate)/
      );
      if (!locationMatch) {
        //If we couldn't find a location name, there is no useful information for the player
        continue;
      }
      const location = locationMatch[1].trim();
      const lines = locationString.split('\n').slice(1);
      for (let line of lines) {

        let maybeSOSText = '';
        if(line.includes('SOS:')) {
          [maybeSOSText, line] = line.split('SOS:');
          maybeSOSText = ` (${(maybeSOSText.trim() + ' SOS').trim()})`
          line = line.trim();
        }

        const match = line.match(/^(.+?)\s+(Lv(?:s)?\s?\d+(?:-\d+)?)\b/);
        if (!match) {
          console.log("Couldn't find Pokemon: " + line);
          continue;
        }

        const name = match[1].trim();
        const level = match[2].trim();
        let mon = lookupTable.get(name);
        let stringToPush = location + ` (${level})` + maybeSOSText;
        if (mon && !mon.locations.includes(stringToPush)) {
          mon.locations.push(stringToPush);
        }
      }
    }
  }

  private parseTrainers(ctx: PokedexContext, trainerStrings: string[]) {
    if (trainerStrings.length == 1) {
      let lines = trainerStrings[0].split('\n');
      for (let trainerString of trainerStrings[0].split('\n')) {
        ctx.trainers.push(Trainer.fromString(trainerString));
      }
      console.log(lines[0]);
    } else if (trainerStrings.length > 1) {
      for (let trainerString of trainerStrings) {
        ctx.trainers.push(Trainer.fromString(trainerString));
      }
    }
  }

  private parseStarters(ctx: PokedexContext, starterStrings: string[]) {
    for (let starterString of starterStrings) {
      let starter = starterString
        .trim()
        .substring(starterString.trim().indexOf(' ') + 1);
      if (starter) ctx.starters.push(starter);
    }
  }

  private async getDefaultDataForGeneration(
    gen: number
  ): Promise<PokedexContext> {
    const dex_path = `./assets/data/gen${gen}vanilla.pkdx`;
    return this.parseDex(dex_path);
  }

  private getGenerationFromLog(logBlocks: string[]): string {
    let completion = logBlocks.find((s) =>
      s.trim().startsWith('----------------')
    );
    if (completion) {
      let match = completion.match(/of (.*?) completed/);
      if (match) {
        let title = match[1].toLowerCase();
        if (
          (title.includes('red') && !title.includes('fire')) ||
          (title.includes('green') && !title.includes('leaf')) ||
          title.includes('blue') ||
          title.includes('yellow')
        ) {
          return '1';
        } else if (
          (title.includes('gold') && !title.includes('heart')) ||
          (title.includes('silver') && !title.includes('soul')) ||
          title.includes('crystal')
        ) {
          return '2';
        } else if (
          (title.includes('ruby') && !title.includes('omega')) ||
          (title.includes('sapphire') && !title.includes('alpha')) ||
          title.includes('emerald') ||
          title.includes('red') ||
          title.includes('green')
        ) {
          return '3';
        } else if (
          (title.includes('diamond') && !title.includes('brilliant')) ||
          (title.includes('pearl') && !title.includes('shining')) ||
          title.includes('platinum') ||
          title.includes('silver') ||
          title.includes('gold')
        ) {
          return '4';
        } else if (title.includes('black') || title.includes('white')) {
          return '5';
        } else if (
          title.includes('pokemon x') ||
          title.includes('pokemon y') ||
          title.includes('ruby') ||
          title.includes('sapphire')
        ) {
          return '6';
        } else if (title.includes('sun') || title.includes('moon')) {
          return '7';
        } else {
          return '7';
        }
      }
    }
    return '7';
  }

  cacheDex(dexctx: PokedexContext) {
    const dex_string = JSON.stringify(dexctx);
    localStorage.setItem('pokedexContext', dex_string);
  }

  async attemptLoadCachedDex(): Promise<PokedexContext | undefined> {
    const cached_dex = localStorage.getItem('pokedexContext');
    if (!cached_dex) return undefined;

    try {
      return PokedexContext.fromJSON(cached_dex);
    } catch (e) {
      console.warn('Failed to parse cached pokedex:', e);
      return undefined;
    }
  }

  private parseMoveMachineString(token: string): [number, string] {
    let match = token.match(/\d+/);
    let machineId = parseInt(match ? match[0] : '0');
    let move = token.slice(token.indexOf(' ')).trim();
    return [machineId, move];
  }
}
