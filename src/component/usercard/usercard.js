import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  render () {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          v.avatar ? (<Card key={v._id}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            />
            <Body>
              {v.type === 'boss'
                ? <div>公司:{v.company}</div>
                : null}
              {v.desc.split('\n').map(v => (
                <div key={v}>{v}</div>
              ))}
              {v.type === 'boss'
                ? <div>薪资:{v.money}</div>
                : null}
            </Body>
          </Card>) : null
        ))}
        <WhiteSpace />
      </WingBlank>
    )
  }
}

export default UserCard