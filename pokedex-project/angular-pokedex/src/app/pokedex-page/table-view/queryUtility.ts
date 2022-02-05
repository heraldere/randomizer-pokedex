// import {  } from "src/app/pokedex.service";
import { Pokemon, PokeType } from "src/app/Pokemon";

export enum NumberOperators {
    eq = '=',
    neq = '!=',
    geq = '>=',
    gt = '>',
    leq = '<=',
    lt = '<',
}
export enum CategoryOperators {
    in = 'in',
    notin = 'not in'
}
export type Operators = NumberOperators | CategoryOperators;
export type IPokeRule = {
    field: 'hp' | 'attack' | 'sp_attack' | 'type' | 'defense' | 'sp_defense' | 'total';
    operator: NumberOperators;
    value: string;
} | {
    field: 'type';
    operator: CategoryOperators;
    value: PokeType[];
};
export type IPokeQuery = {
    condition: 'and' | 'or';
    rules: (IPokeQuery|IPokeRule)[]
};


export function filterDataByQueryTree(data: Pokemon[], querytree: IPokeQuery): any[] {

    return data.filter(p => recursiveRuleCheck(p, querytree));
}

function recursiveRuleCheck(pokemon: Pokemon, querytree: IPokeQuery|IPokeRule): boolean {
    if ((querytree as IPokeRule).field && (querytree as IPokeRule).operator) {
        return ruleCheck(pokemon, querytree as IPokeRule)
    }
    else if ((querytree as IPokeQuery).condition == 'and') {
        return (querytree as IPokeQuery).rules.every((subquery => recursiveRuleCheck(pokemon, subquery)))
    }
    else if ((querytree as IPokeQuery).condition == 'or') {
        return (querytree as IPokeQuery).rules.some((subquery => recursiveRuleCheck(pokemon, subquery)))
    }

    return true;
}

// TODO: This function will need to be reworked to use Pokemon functions (for spoilers)
function getValueFromPokemon(field: string, pokemon: Pokemon) {
    if (field == 'type') {
        return pokemon.type2 ? [pokemon.type1, pokemon.type2] : [pokemon.type1];
    }
    
    // Cute, but we'll need a more robust (read: tedious) accessor.
    return (pokemon as any)[field];
}

function ruleCheck(pokemon: Pokemon, rule: IPokeRule) {
    const value = getValueFromPokemon(rule.field, pokemon);
    switch (rule.operator) {
        case CategoryOperators.in: {
            return (value as string[]).some((t) => (rule.value as string[]).includes(t))
        } break;
        case CategoryOperators.notin: {
            return (value as string[]).every((t) => !(rule.value as string[]).includes(t))
        } break;
        case NumberOperators.eq: {
            if (typeof value == 'number') {
                return Number.parseFloat(rule.value) == value
            } else if(rule.field == 'type') {
                return (value as string[]).includes(rule.value)
            } else {
                return rule.value == value
            }
        } break;
        case NumberOperators.neq: {
            if (typeof value == 'number') {
                return Number.parseFloat(rule.value) != value
            }  else if(rule.field == 'type') {
                return !(value as string[]).includes(rule.value)
            } else {
                return rule.value != value
            }
        } break;
        case NumberOperators.geq: {
            return value >= Number.parseFloat(rule.value)
        } break;
        case NumberOperators.gt: {
            return value > Number.parseFloat(rule.value)
        } break;
        case NumberOperators.lt: {
            return value < Number.parseFloat(rule.value)
        } break;
        case NumberOperators.leq: {
            return value <= Number.parseFloat(rule.value)
        } break;

        default:
            return true;
            break;
    }
    return true;
}
