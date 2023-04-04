import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:3000/api';

const backend = axios.create({
    baseURL: API_URL
});

backend.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': AsyncStorage.getItem('@uademe:token')
    };

    return config;
})

export default backend;