import axios from 'axios'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求是不存在的，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
const baseURL = process.env.VUE_APP_NODE_ENV == 'development' ? '/api' : process.env.VUE_APP_API
const instance = axios.create({
  baseURL
})
class Request {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.queue = {}
    this.timeout = 5000
  }

  // 检查返回状态
  checkStatus (response) {
    console.log('response===',response)
    
    const responseData = response.data
    console.log('responseData===',responseData)
    // 服务器返回默认结果
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      // 后台自定义错误
      // 正常
    //   if (responseData.status == 0) {
        return responseData
    //   }
      // 登录过期
    //   if (responseData.errorCode === 402 || responseData.status === 401) {
    //     return Promise.reject(errorText)
    //   }
    //   return Promise.reject(responseData)
    }
    // 服务器错误
    // const errorText = response && (codeMessage[response.status] || response.statusText)
    Promise.reject(response)
  }

  // 拦截器
  interceptors (instance, scope) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      config.baseURL = baseURL;
      config.scope = scope
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      return res
    }, error => {
      let errorInfo = error.response
      if (!errorInfo) {
        try {
          const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          }
        } catch (e) {
          errorInfo = error
        }
      }
      return Promise.reject(errorInfo)
    })
  }

  // 失败
  error (e) {
    return Promise.reject(e)
  }


  setRequest (method, url, data, scope, file = false) {
    this.interceptors(instance, scope)

    const options = { method, url }

    let contentType = ''
    if (file) {
      contentType = 'multipart/form-data'
    } else if (method == 'post') {
      contentType = 'application/json'
    } else {
      contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': contentType,
      // token: store.state.user.token || 1
    }

    Object.assign(options, {
      headers,
      [method == 'post' ? 'data' : 'params']: data
    })

    return instance(options).then(this.checkStatus).catch(this.error)
  }

  // post 请求封装
  post (url, data, scope) {
    return this.setRequest('post', url, data, scope)
  }

  // get  请求封装
  get (url, data, scope) {
    return this.setRequest('get', url, data, scope)
  }

  // post 请求封装
  POST (url, data, scope) {
    return this.setRequest('post', url, data, scope).then(this.success)
  }

  // get  请求封装
  GET (url, data, scope) {
    return this.setRequest('get', url, data, scope).then(this.success)
  }

  // 文件
  File (url, data, scope) {
    return this.setRequest('post', url, data, scope, true).then(this.fileSuccess)
  }

  success (da) {
    return da.data
  }

  fileSuccess (da) {
    return da
  }
}

export default Request
