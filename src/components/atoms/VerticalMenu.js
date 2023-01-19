import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';

import { Menu } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;

function handleClick(e) {
  console.log('click', e);
}

function verticalMenu(){
    return(
  <Menu onClick={handleClick} style={{ width: 60 }} mode="vertical">
    <SubMenu key="sub1" icon={<MenuFoldOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item key="1">About us</Menu.Item>
        <Menu.Item key="2">FAQ</Menu.Item>
        <Menu.Item key="2">Read T&C</Menu.Item>
      </Menu.ItemGroup>
      </SubMenu>
      </Menu>
    )
}
export default verticalMenu