import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
import Dashboard from './component/dashboard/dashboard'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

// boss genius me msg 4个页面
ReactDom.render(
    (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AuthRoute />
            <Switch>
              <Route path='/bossinfo' component={BossInfo} />
              <Route path='/geniusinfo' component={GeniusInfo} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/chat/:user' component={Chat} />
              <Route component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    ),
     document.getElementById('root')
)
