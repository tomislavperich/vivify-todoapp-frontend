import BaseApiService from './BaseApiService';

class LoginService extends BaseApiService {
    logIn(props) {
        const { email, password } = props;
        return this.apiClient.post(`/api/auth/login`, { email, password })
            .then(res => {
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
        var g =  localStorage.getItem('token'); 
        console.log(g);
        return g;
    }

    setHeaders() {
        this.http.attachHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }
}

export default new LoginService();