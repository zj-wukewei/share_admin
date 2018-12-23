import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import User from '../containers/User'
import UserInfo from '../containers/User/UserInfo'
import Tag from '../containers/Tag'
import Home from '../containers/Home'
import CommetList from '../containers/Home/comment'
import UserManager from '../utils/userManager'

export const menus = [
  {
    key: '/app', title: 'Home', icon: 'home', component: Home,
    subs: [
      { key: '/app/feed/comment/:feedId', title: '评论', component: CommetList, sub: false }
    ]
  },
  {
    key: '/app/manager', title: '管理', icon: 'hdd',
    subs: [
      { key: '/app/manager/tag', title: '分类', component: Tag }
    ]
  },
  {
    key: '/app/system', title: '系统', icon: 'setting',
    subs: [
      { key: '/app/system/user', title: '用户', component: User },
      { key: '/app/system/user/:uId', title: '用户详情', component: UserInfo, sub: false },
    ]
  },
]

function menusToPage() {
  let pages = []
  for (let menu of menus) {
    if (menu.component) {
      pages.push({
        key: menu.key,
        component: menu.component
      })
    }
    if (menu.subs) {
      for (let sub of menu.subs) {
        pages.push(sub)
      }
    }
  }
  return pages
}

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
          menusToPage().map(r => {
            const Component = r.component
            return <Route exact key={r.key} path={r.key} render={props => this.requireLogin(<Component {...props} />)} />
          })
        }
        {/* {
          menus && menus.map(menu => {

            const route = r => {
              const Component = r.component
              return <Route exact key={r.key} path={r.key} render={props => this.requireLogin(<Component {...props} />)} />
            }
            return menu.component ? route(menu) : menu.subs.map(r => route(r))

          })
        } */}
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    )
  }
}


export default Routes