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
export enum EqualityOperators {
    eq = '=',
    neq = '!='
}
export type Operators = NumberOperators | CategoryOperators | EqualityOperators;
export type IPokeRule = {
    field: 'hp' | 'attack' | 'sp_attack' | 'defense' | 'sp_defense' | 'speed' | 'total';
    operator: NumberOperators;
    value: string;
} | {
    field: 'type';
    operator: CategoryOperators;
    value: PokeType[];
} | {
    field: 'type';
    operator: EqualityOperators;
    value: PokeType;
}
| {
    field: 'ability';
    operator: EqualityOperators;
    value: string;
}
;
export type IPokeQuery = {
    condition: 'and' | 'or';
    rules: (IPokeQuery|IPokeRule)[]
};


export function filterDataByQueryTree(data: Pokemon[], querytree: IPokeQuery): any[] {

    //TODO: This We should filter on whether or not stats are revealed
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

function ruleCheck(pokemon: Pokemon, rule: IPokeRule) {
    // const value_from_pokemon = getValueFromPokemon(rule.field, pokemon);

//Start from 'scratch' zone
    if(['hp', 'attack', 'sp_attack', 'defense', 'sp_defense', 'speed', 'stat_total'].includes(rule.field)) {
        const stat_from_mon = pokemon.get_stat(rule.field);
        if(!stat_from_mon) {
            return false;
        }
        const stat_from_rule = Number.parseFloat(rule.value as string);
        switch (rule.operator) {
            case NumberOperators.eq: {
                return stat_from_mon == stat_from_rule
            } break;
            case NumberOperators.neq: {
                return stat_from_mon != stat_from_rule

            } break;
            case NumberOperators.geq: {
                return stat_from_mon >= stat_from_rule

            } break;
            case NumberOperators.leq: {
                return stat_from_mon <= stat_from_rule

            } break;
            case NumberOperators.gt: {
                return stat_from_mon > stat_from_rule

            } break;
            case NumberOperators.lt: {
                return stat_from_mon < stat_from_rule

            } break;
            default:
                break;
        }
    } else if (rule.field == 'type') {
        if (!pokemon.checkTypeRevealed()) {
            return false;
        }
        switch (rule.operator) {
            case EqualityOperators.eq: {
                return [pokemon.get_type1(), pokemon.get_type2()].includes(rule.value)
            } break;
            case EqualityOperators.neq: {
                return !([pokemon.get_type1(), pokemon.get_type2()].includes(rule.value))
    
            } break;
            case CategoryOperators.in: {
                return rule.value.includes(pokemon.get_type1()) ||
                       rule.value.includes(pokemon.get_type2())

            } break;
            case CategoryOperators.notin: {
                return !(rule.value.includes(pokemon.get_type1()) ||
                         rule.value.includes(pokemon.get_type2()))
    
            } break;
        
            default:
                break;
        }
    } else if (rule.field == 'ability') {
        if (pokemon.checkAbilityRevealed()) {
            return false;
        }
        switch (rule.operator) {
            case EqualityOperators.eq: {
                return pokemon.getAbilitiesIfRevealed().map(a => a.toLowerCase()).includes(rule.value.toLowerCase())
            } break;
            case EqualityOperators.neq: {
                return !(pokemon.getAbilitiesIfRevealed().map(a => a.toLowerCase()).includes(rule.value.toLowerCase()))
            } break;
            default:
                break;
        }        
    } else {
        return true;
    }
    return true;
//

    // switch (rule.operator) {
    //     case CategoryOperators.in: {
    //         return (value_from_pokemon as string[]).some((t) => (rule.value as string[]).includes(t))
    //     } break;
    //     case CategoryOperators.notin: {
    //         return (value_from_pokemon as string[]).every((t) => !(rule.value as string[]).includes(t))
    //     } break;
    //     case NumberOperators.eq: {
    //         if (typeof value_from_pokemon == 'number') {
    //             return Number.parseFloat(rule.value) == value_from_pokemon
    //         } else if(rule.field == 'type') {
    //             return (value_from_pokemon as string[]).includes(rule.value)
    //         } else {
    //             return rule.value == value_from_pokemon
    //         }
    //     } break;
    //     case NumberOperators.neq: {
    //         if (typeof value_from_pokemon == 'number') {
    //             return Number.parseFloat(rule.value) != value_from_pokemon
    //         }  else if(rule.field == 'type') {
    //             return !(value_from_pokemon as string[]).includes(rule.value)
    //         } else {
    //             return rule.value != value_from_pokemon
    //         }
    //     } break;
    //     case NumberOperators.geq: {
    //         return value_from_pokemon >= Number.parseFloat(rule.value)
    //     } break;
    //     case NumberOperators.gt: {
    //         return value_from_pokemon > Number.parseFloat(rule.value)
    //     } break;
    //     case NumberOperators.lt: {
    //         return value_from_pokemon < Number.parseFloat(rule.value)
    //     } break;
    //     case NumberOperators.leq: {
    //         return value_from_pokemon <= Number.parseFloat(rule.value)
    //     } break;

    //     default:
    //         return true;
    //         break;
    // }
}
