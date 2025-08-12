import { stringify } from 'node:querystring';
import { PokedexContext } from './PokedexContext';
import { Pokemon } from './Pokemon';
import { Trainer } from './Trainer';
import { PokedexService } from './pokedex.service';

export class PokedexLoader {
  lastFileRead: string = '';

  constructor() {}

  async parseDex(inputFile: string | File): Promise<PokedexContext> {
    let ctx = new PokedexContext();

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
        ctx = this.parseLog(content);
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

  parseLog(fileContent: string): PokedexContext {
    let ctx = new PokedexContext();
    //TODO: unimplemented method
    

    return ctx;
  }

  cacheDex(dexctx: PokedexContext) {
    const dex_string = JSON.stringify(dexctx);
    localStorage.setItem('pokedexContext', dex_string);
  }

  attemptLoadCachedDex(): PokedexContext | undefined {
    const cached_dex = localStorage.getItem('pokedexContext');
    if (!cached_dex) return undefined;

    try {
      return PokedexContext.fromJSON(cached_dex);
    } catch (e) {
      console.warn('Failed to parse cached pokedex:', e);
      return undefined;
    }
  }
}
