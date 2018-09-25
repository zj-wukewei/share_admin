import React, { Component } from 'react';
import { Layout, Icon } from 'antd'
const { Header } = Layout;

class HeaderCustom extends Component {
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                    className="trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
            </Header>
        )
    }
}

export default HeaderCustom;