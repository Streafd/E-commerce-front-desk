import { reqShoppCart, reqDeteleCart, reqCheckCart } from '@/api/index'
// import { is } from 'core-js/fn/object'

const state = {
  cartList: []
}
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqShoppCart()
    if (result.code == 200) {
      commit('GETCSRTLIST', result.data)
    }
  },
  //删除购物产品
  async deleteCartListSkuId({ commit }, skuId) {
    let result = await reqDeteleCart(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //修改购物选中产品状态
  async upDateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqCheckCart(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //修改全部选中状态
  upDateAllChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('upDateCheckedById', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise)
    })
    //最终返回结果
    return Promise.all(promiseAll)
  }
}
const mutations = {
  GETCSRTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
  //计算出来购物数据
  // cartInfoList(state) {
  //   return state.cartList.cartInfoList
  // }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
