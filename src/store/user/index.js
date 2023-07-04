import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api/index'

import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  USERLOGOUT(state) {
    //将仓库中的用户信息清空
    state.token = ''
    state.userInfo = {}
    //本地存储的token情空
    removeToken()
  }
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async reqUserRegister({ commit }, data) {
    let result = await reqUserRegister(data)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user)
    console.log(result)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      //持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //获取用户信息
  async getuserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  async userLogout({ commit }) {
    //向服务器发起请求，清除token
    let result = await reqLogout()
    if (result.code == 200) {
      commit('USERLOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
