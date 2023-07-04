import { reqCategoryList, reqMockBanner, reqMockFloor } from '@/api/index'

export default {
  namespaced: true,
  state: {
    age: 18,
    //三级菜单列表数据
    categoryList: [],
    //轮播图数据
    bannerList: [],
    floorList: []
  },
  actions: {
    //向服务器请求三级菜单列表数据
    async categoryListe(countext) {
      const { data } = await reqCategoryList()
      countext.commit('CategoryList', data)
    },
    //向mock模拟数据请求轮播图数据
    async getBannerList(context) {
      const { data } = await reqMockBanner()
      context.commit('GetBannerList', data)
    },
    //向mock模拟数据请求floor层数据
    async getFloorList(context) {
      const { data } = await reqMockFloor()
      context.commit('GetFloorList', data)
    }
  },
  mutations: {
    CategoryList(state, value) {
      state.categoryList = value
    },
    GetBannerList(state, value) {
      state.bannerList = value
    },
    GetFloorList(state, value) {
      state.floorList = value
    }
  },
  getters: {}
}
