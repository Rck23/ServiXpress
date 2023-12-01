import axios, { AxiosHeaders, AxiosRequestHeaders } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


//DEV (REQUIRE NGROK)
const baseURL = 'https://2f3d-2806-103e-15-31b0-b51a-37e-1428-6976.ngrok-free.app/api'
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