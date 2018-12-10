import BaseApiService from './BaseApiService';
import { API_BASE_URL } from '../config/config';

export class LoginService extends BaseApiService {
    // constructor(props) {
    //     super(props);
    // }

    logIn(props) {
        const { email, password } = props;

        console.log(email, password);
        return this.apiClient.post(`http://${API_BASE_URL}/api/auth/login`, { email, password })
            .then(res => {
                console.log('Success!');
                console.log(res.data.access_token);
                this.http.attachHeaders({
                    'Authorization': `Bearer ${res.data.access_token}`
                });
                this.setToken(res.data.access_token);
                return res.data;
            }).catch(err => {
                throw err;
            });
    }

    logOut() {
        this.http.removeHeaders();
        localStorage.removeItem('token');
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }
}

const ls = new LoginService();
export default ls;