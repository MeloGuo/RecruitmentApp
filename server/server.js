import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'

import csshook from 'css-modules-require-hook/preset'
import assetHook from 'asset-require-hook'

import path from 'path'

import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import App from '../src/app'
import {StaticRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

assetHook({
  extensions: ['png'],
  limit: 8000
})

const Chat = model.getModel('chat')

const app = express()
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    // console.log(data)
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      if (!err) {
        io.emit('recvmsg', Object.assign({}, doc._doc))
      }
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  const context = {}
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>)
  )

  const page = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="stylesheet" href="/${staticPath['main.css']}">
      <meta name="description" content="React开发招聘 App" />
      <meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
      <meta name="author" content="Imooc" >
      <title>Redux+React Router+Node.js全栈开发聊天App</title>
  
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>
  `

  return res.send(page)
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function () {
  console.log('Node app start at port 9093')
})
