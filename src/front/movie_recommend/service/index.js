import { baseUrl } from "./config"

// 网络请求封装成函数
export function mvRequest(options) {
  return new Promise((resolve,reject) => { //Promise包装一层，避免回调地狱，只需要传options参数即可
    wx.request({
      ...options,
      success: (res) => {
        resolve(res.data)
      },
      fail: reject
    })
  })
}

// 封装成类 --> 实例
class MVRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl //设置默认url
  }
  request(options) {
    const { url } = options //解构传进来的url
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseUrl + url, //拼接url
        success: (res) => {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }
  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
}

export const ReqInstance = new MVRequest(baseUrl) //类方法网络请求api实例