import React, { Component } from 'react'
import { connect } from 'react-redux';
import Routes from '../../route'

import { Layout } from 'antd'

import SiderCustom from '../../components/Sider'
import HeaderCustom from '../../components/Header'
import Breadcrumb from '../../components/Breadcrumb'
import { fetchInformation } from '../Login/action';


const { Content, Footer } = Layout;

class App extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        this.props.fetchInformation();
    }

    render() {
        console.log('information', this.props.information)
        return (
            <Layout className="layout">
                <SiderCustom
                    collapsed={this.state.collapsed}
                />
                <Layout>
                    <HeaderCustom information={this.props.information} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <div style={{ margin: '0 16px' }}>
                        <Breadcrumb />
                        <Content style={{ background: '#fff', padding: '20px', borderRadius: '4px' }}>
                            <Routes />
                        </Content>
                    </div>
                    <Footer style={{ textAlign: 'center' }}>
                        Share ©2018 Created by GoGo
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        information: state.login.information,
    }
}

export default connect(mapStateToProps, { fetchInformation })(App);