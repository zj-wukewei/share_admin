import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import './App.scss'
import moment from 'moment'
import 'moment/locale/zh-cn'

import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore();

moment.locale('zh-cn')

ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
