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
 *  const fns = configs.map((c) => reqLock(c, request, { exec: false, execFn: false }))
    const res = await reqAll(fns)
 */
const reqAll = async (fns) => await Promise.all(fns)

/**
 *
 * @param {Object} config 请求参数，配置等
 * @param {Function} fn Promise方法
 * @param {Object} { exec, execFn } 是否立即执行，false时返回可执行函数, execFn: 是否返回promise方法
 * @returns
 */
const reqLock = (config, fn, { exec = true, execFn = false } = {}) => {
  const req = fn(config, { execFn: true })
  return dealWithFn(req, lock, { exec, execFn })
}

/**
 *
 * @param {Object} config 请求参数，配置等
 * @param {Object} { exec, execFn } 是否立即执行，false时返回可执行函数, execFn: 是否返回promise方法
 * @returns
 */
const request = (config, { exec = true, execFn = false } = {}) => {
  config = reqConfig(config)
  return dealWithFn(config, requestProxy, { exec, execFn })
}

/**
 *
 * @param {Object} config 请求参数，配置等
 * @param {Function} fn Promise方法
 * @param {Object} { exec, execFn } 是否立即执行，false时返回可执行函数, execFn: 是否返回promise方法
 * @returns
 */
const dealWithFn = (config, fn, { exec = false, execFn = false }) => {
  if (exec && !execFn) {
    return fn(config)
  } else if (execFn) {
    return () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await fn(config)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fn(config)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = {
  reqAll,
  reqLock,
  request
}
