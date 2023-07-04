import { reqGoodsInfo, reqAddOrUpdata } from '@/api/index.js'
import { getUUID } from '@/utils/uuid_token'
export default {
  namespaced: true,
  state: {
    valuesSkuJson: '',
    categoryView: {},
    price: 0,
    spuSaleAttrList: [],
    skuInfo: {},
    uuid_token: getUUID()
  },
  actions: {
    async getGoodsInfo({ commit }, id) {
      const { data: res } = await reqGoodsInfo(id)
      console.log(res)
      commit('GETGOODSINFO', res)
    },
    //将产品加入购物车
    async AddOrUpdata({ commit }, { skuId, skuNum }) {
      //返回购物车的解构
      // try {
      //   //服务器写入数据成功，并没有返回其他数据，只返回code=200，代表这次操作成功
      //   //没有返回其他数据就不用急进行mutations操作
      //   //当前这个函数如果执行返回的Promise
      // } catch {}
      const data = await reqAddOrUpdata(skuId, skuNum)
      console.log(data)
      if (data.code === 200) {
        //加入购物成成功
        // console.log(id)
        return 'ok'
      } else {
        //加入购物成失败
        return Promise.reject(new Error('faile'))
      }
    }
  },
  mutations: {
    GETGOODSINFO(state, res) {
      Object.assign(state, res)
    }
  },
  getters: {}
}
