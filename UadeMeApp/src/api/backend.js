import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://192.168.0.248:3000/api';
//const API_URL = 'http://10.100.17.149:3000/api';

const backend = axios.create({
    baseURL: API_URL
});

backend.interceptors.request.use(
    async(config) => {
        config.headers = {
            ...config.headers,
            'x-token': await AsyncStorage.getItem('@uademe:token')
        };

        return config;
    }
);

export default backend;