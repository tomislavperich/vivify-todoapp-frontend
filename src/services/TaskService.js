import BaseApiService from './BaseApiService';

class TaskService extends BaseApiService {
    getTasks(token) {
        return this.apiClient.get(`/api/task`, { token })
            .then(res => {
                return res.data;
            }).catch(err => {
                throw err;
            });
    }
    
    createTask(token, name, desc, priority) {
        return this.apiClient.post(`/api/task`, { token, name, desc, priority })
            .then(res => {
                return res.data;
            }).catch(err => {
                throw err;
            });
    }
}

export default new TaskService();