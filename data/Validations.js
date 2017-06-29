import { Races, Classes } from '../data/MetaData'

export const isValidateClass = (character, classValue) => {
    if((character.race == Races.Human) && (classValue == Classes.Dwarf || classValue == Classes.Elf || classValue == Classes.Halfling))
        return false;
    return true;
}

export const isValidAttribute = (attr) => {
    return attr > 2;
}

export const getAttrModifier = (attrValue) => {
    if(attrValue == null)
        return 0;
    if(typeof(attrValue) == "string")
        attrValue = parseInt(attrValue);
    switch(attrValue)
    {
        case 2:
        case 3:
            return -3;
        case 4:
        case 5:
            return -2;
        case 6:
        case 7:
        case 8:
            return -1;
        case 9:
        case 10:
        case 11:
        case 12:
            return 0;
        case 13:
        case 14:
        case 15:
            return 1;
        case 16:
        case 17:
            return 2;
        case 18:
            return 3;
        default:
            return 0;
    }
}

export const getTHAC0 = (characterclass, level) => {
    if(typeof(level) == "string")
        level = parseInt(level);
    switch(characterclass) {
        case Classes.Fighter:
        case Classes.Dwarf:
        case Classes.Elf:
        case Classes.Halfling:
            return 19 - Math.floor(level / 3) * 2;
        case Classes.Cleric:
        case Classes.Thief:
            return 19 - Math.floor(level / 4) * 2;
        case Classes.MagicUser:
            return 19 - Math.floor(level / 5) * 2;
        default:
            return 19;
    }
}

export const getAttackBonus = (characterclass, level) => {
    return 20 - getTHAC0(characterclass, level);
}