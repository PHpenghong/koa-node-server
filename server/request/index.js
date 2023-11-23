const requestProxy = require('./request')
const lock = require('./lock')

/**
 *
 * @param {Object} config 请求参数，配置等
 * @returns
 */
const reqConfig = (config) => ({
  method: config.method,
  url: config.url,
  headers: config.headers,
  data: config.data || {}
})

/**
 *
 * @param {fn[]} fns new Promise 方法集合
 * @returns
 */
const reqAll = async (fns) => await Promise.all(fns)

/**
 *
 * @param {fn} fn 将fn包裹成new Promise ， 用于处理 reqLock | request
 * @returns
 */
const allFn = (fn) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fn()
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })

/**
 *
 * @param {Object} config 请求参数，配置等
 * @param {*} execute 是否立即执行，false时返回可执行函数
 * @returns
 */
const reqLock = (config, execute = true) => {
  const req = request(config)
  if (execute) {
    return lock(req)
  } else {
    return async () => await lock(req)
  }
}

/**
 *
 * @param {Object} config 请求参数，配置等
 * @param {*} execute 是否立即执行，false时返回可执行函数
 * @returns
 */
const request = (config, execute = false) => {
  config = reqConfig(config)
  if (execute) {
    return requestProxy(config)
  } else {
    return async () => await requestProxy(config)
  }
}

module.exports = {
  reqAll,
  allFn,
  reqLock,
  request
}
