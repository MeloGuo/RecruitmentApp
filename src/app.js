import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch (err, info) {
    this.setState({hasError: true})
  }

  render () {
    // return this.state.hasError ? <h2>页面出错了!!!</h2> :
    return (<div>
      <AuthRoute />
      <Switch>
        <Route path='/bossinfo' component={BossInfo} />
        <Route path='/geniusinfo' component={GeniusInfo} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/chat/:user' component={Chat} />
        <Route component={Dashboard} />
      </Switch>
    </div>)
  }
}

export default App
