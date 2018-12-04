import React, {Component} from 'react'
import {Icon, Layout, Menu} from 'antd'
import {menus} from '../../route'
import {Link, withRouter} from 'react-router-dom'

const { Sider } = Layout;

class SiderCustom extends Component {

    state = {
        openKey: '',
        selectedKey: '',
    }

    menuClick = e => {

        this.setState({
            selectedKey: e.key
        }, () => {
            console.log(this.state);
        });

    };

    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
        })
    };

    renderMenus = () => {
        return (
            <Menu
                theme="dark"
                mode="inline"
                onClick={this.menuClick}
                openKeys={[this.state.openKey]}
                onOpenChange={this.openMenu}
                selectedKeys={[this.state.selectedKey]} >
                {menus && menus.map(item =>
                    item.subs ? this.renderSubMenu(item) : this.renderMenuItem(item)
                )}
            </Menu>
        )
    }

    renderSubMenu = (item) => {
        return (
            <Menu.SubMenu
                key={item.key}
                title={
                    <span>
                        {item.icon && <Icon type={item.icon} />}
                        <span className="nav-text">{item.title}</span>
                    </span>
                }
            >
                {item.subs.map(item => this.renderMenuItem(item))}
            </Menu.SubMenu>
        )
    }

    renderMenuItem = (item) => {
      if (typeof(item.sub) !== 'undefined' && !item.sub) {
        return null
      }

        return (
            <Menu.Item
                key={item.key}
            >
                <Link to={item.key}>
                    {item.icon && <Icon type={item.icon} />}
                    <span className="nav-text">{item.title}</span>
                </Link>
            </Menu.Item>
        )
    }

    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                style={{ overflowY: 'auto' }}
                collapsed={this.props.collapsed}>
                <div className="logo" >{this.props.collapsed ? 'S' : 'Share'}</div>
                {this.renderMenus()}
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);