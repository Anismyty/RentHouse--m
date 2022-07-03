import axios from 'axios'
//引入存储密钥的仓库
import store from '@/store'
//引入转换请求到的数据的方法
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080',

  //自定义后端返回的原始数据
  transformResponse: [
    (data) => {
      try {
        return JSONBig.parse(data)
      } catch (e) {
        return data
      }
    },
  ],
})

//请求拦截器【用于封装密钥】
request.interceptors.request.use(
  (config) => {
    //请求发起会经过这里
    //config是本身存在的对象，往这个对象里添加新的属性
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `${user.token}`
    }
    //如果不反悔config，请求就会被拦截
    return config
  },
  (err) => {
    //请求错误会经过这里
    return Promise.reject(err)
  }
)

export default request
export const baseURL = 'http://liufusong.top:8080'
