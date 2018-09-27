import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../containers/Login'
import NotFound from '../containers/404';
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
                <Route exact path="/" render={() => <Redirect to="/app/home" push/>}/>   
                <Route path="/app" component={Layout} />
                <Route path="/404" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        </Router>
        </LocaleProvider>
    );
  }
}