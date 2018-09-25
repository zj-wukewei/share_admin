import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import User from '../containers/User';
import Tag from '../containers/Tag';

export const menus = [
  {
    key: '/app/manager', title: '管理', icon: 'home',
    subs: [
      { key: '/app/manager/tag', title: '标签', component: Tag }
    ]
  },
  {
    key: '/app/system', title: '系统', icon: 'setting',
    subs: [
      { key: '/app/system/user', title: '用户', component: User }
    ]
  },
]

class Routes extends Component {
  render() {
    return (
      <Switch>
      {
        menus && menus.map(menu => {
         return menu.subs && menu.subs.map(sub => {
            console.log("sub", sub)
            const Component = sub.component
            return (
              <Route exact key={sub.key} path={sub.key} render= {props => <Component {...props}/>} />
            )
          })
        })
      }
    </Switch>
    )
  }
}


export default Routes