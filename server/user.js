const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
  // User.remove({}, function (e, d) {})
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})
Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})
Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', function (req, res) {
  console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '后端出错'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})
Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    // 用户有没有cookie
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

function md5Pwd (pwd) {
  const salt = 'this_app_is_good_324xzf&%&*(%'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
