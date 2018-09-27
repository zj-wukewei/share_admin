import { message } from 'antd';
import UserManager from './userManager'

function preHandle(url, option) {
  // if (process.env.NODE_ENV != 'dev') {
  //   url = context + url
  // }
  option = option || {}
  if (!option.type) {
    option.type = 'json'
  }
  if (!option.method) {
    option.method = 'GET'
  }
  const body = option.body

  let contentType = 'application/json;charset=utf-8'
  if (option.body && option.type === 'json') {
    contentType = 'application/json;charset=utf-8'
  }
  const user = UserManager.get()

  const request = {
    method: option.method,
    credentials: 'include',
    headers: {
      'ajax': 'ajax',
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': contentType,
      'APP-ID': '0',
      'APP-VERSION': '1',
      'APP-MODEL': 'admin',
      'TOKEN': user.token
    }
  }

  if (body) {
    if (option.type === 'text') {
      request.body = _bodyParam(body)
    } else {
      request.body = JSON.stringify(body)
    }
  }
  return { url, request }
}

function method(type) {
  return function (url, option) {
    option = option || {}
    option.method = type
    let handleArg = preHandle(url, option)

    return new Promise((resolve, reject) => {
      fetch(handleArg.url, handleArg.request).then(response => {
        if (response.status === 200) {
          return response.json()
        }
        if (response.status === 404) {
          // return Promise.resolve({
          //   status: -1, msg: '未找到指定接口，请联系开发人员'
          // })
          message.error('未找到指定接口，请联系开发人员');
          return;
        }
        if (response.status === 400) {
          // return Promise.resolve({
          //   status: -1, msg: '未找到指定接口，请联系开发人员'
          // })
          message.error(response.msg);
          return;
        }
        // return Promise.resolve({
        //   status: -1, msg: 'HTTP: ' + response.status
        // })

      }).then(result => {
        try {
          console.log('result', result)
          if (result.code === 0) {
            resolve(result.data)
          } else {
            console.log('resultmsg', result.msg)
            message.error(result.msg);
            reject(result)
            // reject(result.msg || ('错误码：' + result.code))
          }
        } catch (err) {
          throw err
        }
      }).catch(err => reject(err))
    })
  }
}

export let GET = method('GET')
export let POST = method('POST')
export let PUT = method('PUT')
export let PATCH = method('PATCH')
export let DELETE = method('DELETE')
export let HEAD = method('HEAD')

export let _get = GET
export let _post = POST
export let _put = PUT
export let _patch = PATCH
export let _delete = DELETE
export let _head = HEAD

export default {
  get: GET,
  post: POST,
  put: PUT,
  patch: PATCH,
  delete: DELETE,
  head: HEAD,
}

function _bodyParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ === 0) {
          prefix = ''
        } else {
          prefix = ','
        }
        paramUrl += prefix + param + '=' + paramObj[param]
      }
    }
  }
  return encodeURI(paramUrl)
}
