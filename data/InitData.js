import { loadStore } from './DataStorage'

export default initData = (loadFromFile, fakeData) => {
    let data = {};

    data.currentCharacter = "";
    if(loadFromFile == false) {
        if(fakeData == false)
        {
            data.currentKey = 0;
            data.characters = {};
        }
        else
        {
            data.currentKey = 2;
            data.characters = { Character1: { charactername: "ben" }, Character2: { charactername: "haker" }};
        }
    }
    else 
        data = loadStore();
    return data;
}