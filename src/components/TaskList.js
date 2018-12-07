import React, { Component } from 'react';
import { List } from 'antd';
import './TaskList.scss';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

export default class TaskList extends Component {
  render() {
    return (
        <List
            className="tasklist"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
        />
    )
  }
}
