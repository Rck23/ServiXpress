import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


//DEV (REQUIRE NGROK)
const baseURL = 'https://9b02-187-233-96-171.ngrok-free.app/api'
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


export default API;