import { v4 as uuidv4 } from 'uuid'
//生成一个随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  //先从本地存储获取uuid，判断是否存在
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  //如果没有，则生成
  if (!uuid_token) {
    //生成游客临时身份
    uuid_token = uuidv4()
    //本地存储
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  //要有返回值，没有则返回undefined
  return uuid_token
}
