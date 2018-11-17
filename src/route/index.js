import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import User from '../containers/User'
import UserInfo from '../containers/User/UserInfo'
import Tag from '../containers/Tag'
import Home from '../containers/Home'
import UserManager from '../utils/userManager'

export const menus = [
  {
    key: '/app', title: 'Home', icon: 'home', component: Home
  },
  {
    key: '/app/manager', title: '管理', icon: 'hdd',
    subs: [
      {key: '/app/manager/tag', title: '分类', component: Tag}
    ]
  },
  {
    key: '/app/system', title: '系统', icon: 'setting',
    subs: [
      {key: '/app/system/user', title: '用户', component: User},
      {key: '/app/system/user/:uId', title: '用户详情', component: UserInfo, sub: false}
    ]
  },
]

class Routes extends Component {

  requireLogin = (component) => {
    const { token } = UserManager.get()
    if (token) {
      return component
    }
    return <Redirect to={'/login'} />
  }

  render() {
    return (
      <Switch>
      {
        menus && menus.map(menu => {

          const route = r => {
            const Component = r.component
            return  <Route exact key={r.key} path={r.key} render= {props => this.requireLogin(<Component {...props}/>)} />
          }
          return menu.component ? route(menu) : menu.subs.map(r => route(r))
      
        })
      }
       <Route render={() => <Redirect to="/404" />} />
    </Switch>
    )
  }
}


export default Routes