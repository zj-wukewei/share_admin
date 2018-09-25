import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../containers/Login'
import Layout from '../containers/Layout'

export default class Root extends Component {
    render() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Layout}/>
            </Switch>
        </Router>
    );
  }
}