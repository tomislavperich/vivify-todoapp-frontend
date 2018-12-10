import React, { Component } from 'react';
import { List } from 'antd';
import './TaskList.scss';


export default class TaskList extends Component {
  render() {
    return (
      <List
        className="tasklist"
        header={<div>Low priority</div>}
        bordered
        dataSource={this.props.tasks}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta 
              className="tasklist-item"
              title={item.name}
              description={item.desc}
            />
          </List.Item>
        )}
    />
    )
  }
}
