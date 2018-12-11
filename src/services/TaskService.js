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
        var task = this.parseTask({ token, name, desc, priority });

        return this.apiClient.post(`/api/task`, task)
            .then(res => {
                return res.data;
            }).catch(err => {
                throw err;
            });
    }

    updateTask(token, task_id, name, desc, priority) {
        var task = this.parseTask({ token, name, desc, priority });
        
        return this.apiClient.put(`/api/task/edit/${task_id}`, task)
            .then(res => {
                return res.data;
            }).catch(err => {
                throw err;
            });
    }

    deleteTask(token, task_id) {
        return this.apiClient.put(`/api/task/delete/${task_id}`, { token })
            .then(res => {
                return res.data;
            }).catch(err => {
                throw err;
            });
    }

    parseTask = (task) => {
        // Convert priority to int equivalent
        var newPriority;
        switch (task.priority) {
            case 'low':
                newPriority = 0;
                break;
            case 'medium':
                newPriority = 1;
                break;
            case 'high':
                newPriority = 2;
                break;
            case 'urgent':
                newPriority = 3;
                break;
            default:
                newPriority = 0;
        }

        task.priority = newPriority;
        return task;
    }
}

export default new TaskService();