import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import form from '../../component/form/form'

@connect(
  state => state.user,
  {login}
)
@form
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register () {
    this.props.history.push('/register')
  }

  handleLogin () {
    this.props.login(this.props.state)
  }

  render () {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <List>
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >用户</InputItem>
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}
              type='password'
            >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type='primary'>登陆</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
