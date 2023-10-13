import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


//DEV (REQUIRE NGROK)
const baseURL = 'https://0789-2806-103e-2-31cf-bd14-9fd1-54f7-635.ngrok-free.app/api'
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