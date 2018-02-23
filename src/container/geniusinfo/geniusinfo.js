import React from 'react'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  render () {
    const path = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={this.props.redirectTo} /> : null}  
        <NavBar mode='dark'>牛人完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({
              avatar: imgname
            })
          }}
        />
        <InputItem onChange={v => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows='3'
          autoHeight
          title='个人简介' />
        <Button 
          onClick={() => {
            this.props.update(this.state)
          }}
          type='primary'
        >保存</Button>
      </div>
    )
  }
}

export default GeniusInfo
