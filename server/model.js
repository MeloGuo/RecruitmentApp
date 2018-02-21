const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongo connect success')
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {'type': String, require: true},
    'avatar': {'type': String},
    'desc': {'type': String},
    'title': {'type': String},
    // 如果你是boss
    'company': {type: String},
    'money': {type: String}
  },
  chat: {

  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
