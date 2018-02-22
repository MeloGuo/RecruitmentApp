import axios from 'axios'
import { getRedirectPath } from '../util'
// action type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

// reducer
const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
export function user (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

// action creater
function registerSuccess (data) {
  return { type: REGISTER_SUCCESS, payload: data }
}

function errorMSG (msg) {
  return { type: ERROR_MSG, msg: msg }
}

function loginSuccess (data) {
  return { type: LOGIN_SUCCESS, payload: data }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMSG('用户密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            dispatch(loginSuccess(res.data.data))
          } else {
            dispatch(errorMSG(res.data.msg))
          }
        })
  }
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd) {
    return errorMSG('用户名或密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMSG('密码前后不一致')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            dispatch(registerSuccess({user, pwd, type}))
          } else {
            dispatch(errorMSG(res.data.msg))
          }
        })
  }
}

export function loadData (userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}
