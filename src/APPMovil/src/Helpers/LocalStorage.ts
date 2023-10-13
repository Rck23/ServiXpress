import AsyncStorage from "@react-native-async-storage/async-storage"
import { ResultData } from "../Interfaces/DataResponse";
import { HandleException } from "./GlobalFunctions";


/**
 * Generic method to store a object into Local Storage
 * @param key 
 * @param data 
 */
export const LocalStorageStoreData = async <T>(key: string, data: T): Promise<ResultData> => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonData);

        return { ok: true, icon: 'success' }
    } catch (error) {
        return HandleException(error)
    }
};



/**
 * Generic method to get a object form Local Storage
 * @param key 
 * @returns 
 */
export const LocalStorageGetData = async <T>(key: string): Promise<ResultData> => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        if (jsonData !== null) {
            const parsedData: T = JSON.parse(jsonData);
            return { ok: true, icon: 'success', data: parsedData }
        }
        return { ok: true, icon: 'success' }
    } catch (error) {
        return HandleException(error)
    }
};