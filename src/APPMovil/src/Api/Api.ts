import axios, { AxiosHeaders, AxiosRequestHeaders } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


//DEV (REQUIRE NGROK)
const baseURL = 'https://1f5a-187-233-126-196.ngrok-free.app/api'
const API = axios.create({ baseURL });

API.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `bearer ${token}`
            config.timeout = 120000
            config.timeoutErrorMessage = "El servidor ha tardado demasiado tiempo en responder"
        }
        return config;
    }
);


export const formDataHeaders = {
    'Content-Type': 'multipart/form-data'
}


export default API;