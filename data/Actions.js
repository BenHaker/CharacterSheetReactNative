import { saveStore } from './DataStorage'

export const Actions = {
    ADD_CHARACTER: "ADD_CHARACTER",
    REMOVE_CHARACTER: "REMOVE_CHARACTER",
    UPDATE_CHARACTER: "UPDATE_CHARACTER",
    UPDATE_WEAPON: "UPDATE_WEAPON",
    LOAD_CHARACTER: "LOAD_CHARACTER",
    LOAD_DATA: "LOAD_DATA"
};

export const actions = (state = {}, action) => {
    let newState = {};

    if(state.currentKey != null)
        newState.currentKey = state.currentKey;
    else
        newState.currentKey = 0;
    newState.currentCharacter = state.currentCharacter;
    switch (action.type) {
        case Actions.ADD_CHARACTER:
            ++newState.currentKey;
            newState.currentCharacter = "Character" + newState.currentKey;
            newState.characters = Object.assign({}, state.characters, { [newState.currentCharacter]: { charactername: "New Character" }});
            saveStore(newState);
            break;
        case Actions.REMOVE_CHARACTER:
            newState.characters = Object.assign({}, state.characters);
            delete newState.characters[action.key]
            newState.currentCharacter = null;
            saveStore(newState);
            break;
        case Actions.UPDATE_CHARACTER:
            newState.characters = Object.assign({}, state.characters);
            newState.characters[newState.currentCharacter][action.fieldname] = action.value;
            saveStore(newState);
            break;
        case Actions.UPDATE_WEAPON:
            newState.characters = Object.assign({}, state.characters);
            let weapon = newState.characters[newState.currentCharacter][action.weapon];
            if(weapon == null)
                weapon = {};
            weapon[action.fieldname] = action.value;
            newState.characters[newState.currentCharacter][action.weapon] = weapon;
            saveStore(newState);
            break;
        case Actions.LOAD_CHARACTER:
            newState.characters = Object.assign({}, state.characters);
            newState.currentCharacter = action.key;
            break;
        case Actions.LOAD_DATA:
            newState = Object.assign({}, action.data);
            break;
        default:
            newState = state;
            break;
    }
logState(action, newState);
    return newState;
}

const logState = (action, state) => {
    console.log("action:" + action.type + " newState:" + JSON.stringify(state));
}