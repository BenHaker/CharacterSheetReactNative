import {  AsyncStorage } from 'react-native';

export const saveStore = (data) => {
    if(data == null)
        return;
    saveFile("Store", data);
}

export const loadStore = () => {
/*    let data = loadFile("Store");

    if(data == null)
        return {};
    return JSON.parse(data);*/
    return loadFile("Store");
}

saveFile = async (file, data) => {
    try {
      return await AsyncStorage.setItem(file, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save " + file + " with data:" + data);
    }
}

loadFile = async (file) => {
    try {
      return await AsyncStorage.getItem(file);
    } catch (e) {
      console.error("Failed to load " + file + ".");
    }
}