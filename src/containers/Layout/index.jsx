import React, { Component } from 'react';
import SiderCustom from '../../components/Sider';
import HeaderCustom from '../../components/Header';
import { Layout } from 'antd'
import Routes from '../../route';


const { Header, Content, Footer } = Layout;

class App extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className="layout">
                <SiderCustom
                    collapsed={this.state.collapsed}
                />
                <Layout>
                    <HeaderCustom collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content style={{ margin: '0 16px' }}>
                        <Routes/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Share ©2018 Created by GoGo
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default App;