import React, { Component } from 'react';
import { Layout, Icon, Avatar, Dropdown, Menu } from 'antd'

import './header.scss'


const { Header } = Layout;

class HeaderCustom extends Component {

    state = {
        hovered: false
    }

    constructor(props) {
        super(props);
        this.menu = (
            <Menu onClick={this.props.doLogOut}>
                <Menu.Item key="1">退出登录</Menu.Item>
            </Menu>
        )
    }




    handleHoverChange = (visible) => {
        this.setState({
            hovered: visible,
        });
    }

    render() {
        console.log('account', this.props.account)
        return (
            <Header className="app-header">

                <Icon
                    className="trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />


                <div className="user">
                    <span>Hi,{this.props.information.nickname}</span>
                    <Dropdown
                        overlay={this.menu}>
                        <Avatar src={this.props.information.avatar} />
                    </Dropdown>

                </div>

            </Header>
        )
    }
}




export default HeaderCustom;