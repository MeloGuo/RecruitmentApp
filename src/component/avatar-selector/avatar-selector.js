import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTyps = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v => ({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))

    const gridHeader = this.state.text
                        ? (<div>
                          <span>已选择头像</span>
                          <img style={{width: 20}} src={this.state.icon} alt='avatar' />
                        </div>)
                        : '请选择头像'
    return (
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={4}
          onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}
        />
      </List>
    )
  }
}

export default AvatarSelector
