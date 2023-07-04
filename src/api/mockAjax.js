// 对与axios进行二次封装
import axios from 'axios'

//引入进度条
import nProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//利用axios对象方法create，去创建一个axios实例
const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //config:配置对象，对象里面有一个属性很重要，header请求头

  //进度条开始
  nProgress.start()

  return config
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到,可以做一些事情

    //进度条结束
    nProgress.done()

    return res.data
  },
  (err) => {
    //响应失败的回调函数
    return Promise.reject(new Error('false'))
  }
)

export default requests
