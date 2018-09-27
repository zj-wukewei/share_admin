import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { menus } from '../../route/index'

let breadcrumbNameMap = []

for (const index in menus) {
    const menu = menus[index]
    breadcrumbNameMap.push({ ...menu, canLink: menu.component !== undefined })
    if(menu.subs) {
        for (const subIndex in  menu.subs) {
            const sub = menu.subs[subIndex]
            breadcrumbNameMap.push({ ...sub, canLink: true })
        }
    }
}


class BreadcrumbCustom extends Component {

    handleTitle = (url) => {
        const menu = breadcrumbNameMap.find(item => item.key === url)
        return menu
    }

    render() {
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            const menu = this.handleTitle(url)
            if (menu) {
                return (
                    <Breadcrumb.Item key={url}>
                        {
                            menu.canLink ? <Link to={url}>
                                {menu.title}
                            </Link> : menu.title
                        }

                    </Breadcrumb.Item>
                );
            }
            return null;
        });


        return (
            <Breadcrumb style={{ margin: '12px 0' }}>
                {extraBreadcrumbItems}
            </Breadcrumb>
        )
    }
}

export default withRouter(BreadcrumbCustom)