import React, { Component } from 'react';
import route from '../route';
import { HashRouter as Router } from 'react-router-dom';

export default class Root extends Component {
    render() {
    if (!this.route) this.route = route;
    return (
        <Router children={this.route}/>
    );
  }
}