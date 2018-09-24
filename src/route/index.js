import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../containers/Login'

export const childRoutes = []

const routes = (
  <Switch>
    <Route path="/login" component={Login}/>
    <Redirect from="/" exact to="/login"/>
  </Switch>
);

export default routes