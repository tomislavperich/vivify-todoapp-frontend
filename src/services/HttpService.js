import axios from 'axios';
import { API_BASE_URL } from '../config/config';

class HttpService {
    constructor(clientConfig = []) {
        this.client = axios.create(clientConfig);

    }

    attachHeaders = (headers = []) => {
        Object.assign(this.client.defaults.headers, headers);
    }

    removeHeaders = (headers = []) => {
        headers.forEach(key => delete this.client.defaults.headers[key]);
    }
}

const clientConfig = {
    baseUrl: API_BASE_URL,
}

export default new HttpService(clientConfig);