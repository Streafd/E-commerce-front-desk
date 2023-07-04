// 当前这个模块：API进行统一管理
import requests from './request'

//引入mock模拟数据的封装
import mockAjax from './mockAjax'

//三级联动接口
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () =>
  requests.get('/product/getBaseCategoryList')

//当前这个接口(获取搜索框模块的数据)，给服务器传递一个默认对象【至少是一个空对象】
export const ReqgetSearchList = (data) => requests.post('/list', { ...data })

//获取商品详情
export const reqGoodsInfo = (id) => requests.get(`/item/${id}`)

//将产品添加到购物车
export const reqAddOrUpdata = (skuId, skuNum) =>
  requests.post(`/cart/addToCart/${skuId}/${skuNum}`)

//获取购物车列表数据接口
export const reqShoppCart = () => requests.get('/cart/cartList')

//删除购物车产品
export const reqDeteleCart = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改当前产品的选中状态
export const reqCheckCart = (skuId, isChecked) =>
  requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

//获取验证码
export const reqGetCode = (phone) =>
  requests.get(`/user/passport/sendCode/${phone}`)

//用户注册
export const reqUserRegister = (data) =>
  requests({ url: `/user/passport/register`, method: 'post', data })

//用户登录
export const reqUserLogin = (data) =>
  requests({ url: '/user/passport/login', method: 'post', data })

//获取用户信息
export const reqUserInfo = () =>
  requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录
export const reqLogout = () =>
  requests({ url: '/user/passport/logout', method: 'get' })

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () =>
  requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () =>
  requests({ url: '/order/auth/trade', method: 'get' })

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
  })

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })

//获取mock模拟的banner数据
export const reqMockBanner = () => mockAjax.get('/banner')
//获取mock模拟的floor数据
export const reqMockFloor = () => mockAjax.get('/floor')
