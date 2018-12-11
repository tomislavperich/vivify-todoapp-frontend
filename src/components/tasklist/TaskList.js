import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { List, Button } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import LoginService from '../../services/LoginService';
import TaskService from '../../services/TaskService';
import './TaskList.scss';

// Fontawesome icons library
library.add(faTrashAlt, faEdit);

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state ={
      tasks: this.props.tasks,
      error: {
        isShown: false,
        msg: ''
      }
    };
  }

  handleDelete = id => {
    let token = LoginService.getToken();
    if (token) {
      TaskService.deleteTask(token, id)
        .then(() => {
          let tasks = this.state.tasks.filter(task => task.id !== id);
          this.setState({
            tasks: tasks
          });
        }).catch(err => {
          this.setState({
            error: {
              isShown: true,
              msg: err
            }
          });
        });
    }
  }

  handleTaskToggle = id => {
    var token = LoginService.getToken();
    var tasks = this.state.tasks;
    tasks.forEach(task => {
      if(task.id === id) {
        task.is_checked = !task.is_checked;
        this.setState(prevState => ({
          ...prevState,
          tasks: tasks
        }));
        
        TaskService.updateTask(
          token, 
          task.id,
          task.name,
          task.desc,
          task.priority,
          task.is_checked
        ).catch(err => {
            this.setState({
                error: {
                    isShown: true,
                    msg: err.message
                }
            })
        });
      }
    });
  }

  render() {
    return (
      <Fragment>
        { this.state.error.isShown ? (<h1>{this.state.err}</h1>) : (
          <List
            className="tasklist"
            header={<div>Task list</div>}
            bordered
            dataSource={this.state.tasks}
            renderItem={item => (
              <List.Item 
                className={ "tasklist-item-wrapper " + 'priority-' + (item.priority) }
                onClick={() => {this.handleTaskToggle(item.id)}}
                checked={item.is_checked}
              >
                <List.Item.Meta 
                  className={ "tasklist-item " + (item.is_checked && 'task-checked ') }
                  title={item.name}
                  description={item.desc}
                />
                <Button 
                  className="task-option task-edit" 
                  type="danger"
                  onClick={() => this.props.history.push({
                    pathname: '/edit',
                    task: item
                  })}
                >
                  <FontAwesomeIcon icon="edit" />
                </Button>
                <Button 
                  className="task-option task-delete" 
                  type="danger"
                  onClick={() => this.handleDelete(item.id)}
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </Button>
              </List.Item>
            )}
          />
        )}
      </Fragment>
    )
  }
}

export default withRouter(TaskList);