import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../containers/Login'
import Layout from '../containers/Layout'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

export default class Root extends Component {
    render() {
    return (
        <LocaleProvider locale={zh_CN}>
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Layout}/>
            </Switch>
        </Router>
        </LocaleProvider>
    );
  }
}