import axios from 'axios';
import settings from '@/settings';

export default() => {
    return axios.create({
        baseURL: settings.apiUrl,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
