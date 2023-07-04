import { ReqgetSearchList } from '@/api'

export default {
  namespaced: true,
  state: {
    searchList: {}
  },
  actions: {
    //获取search模块数据
    async getSearchList(context, value) {
      // console.log('actions', value)
      const { data: res } = await ReqgetSearchList(value)
      context.commit('GetSearchList', res)
    }
  },
  mutations: {
    GetSearchList(state, value) {
      state.searchList = value
    }
  },
  //计算属性，在项目中，为了简化数据而生
  getters: {
    goodsList(state) {
      //state.searchList.goodsList 如果服务器数据回来了，没问题是一个数组
      //加入网络不给力或没有网，state.searchList.goodsList 应该返回一个空数组
      return state.searchList.goodsList || []
    },
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList || []
    },
    pageNo(state) {
      return state.searchList.pageNo
    },
    pageSize(state) {
      return state.searchList.pageSize
    },
    total(state) {
      return state.searchList.total
    },
    totalPages(state) {
      return state.searchList.totalPages
    }
  }
}
