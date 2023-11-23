// const requestProxy = require('../server/request/request')
const { reqAll, allFn, reqLock } = require('../server/request/index')

const api = process.env.BASEURL_API

const test = async (ctx) => {
  try {
    const config = {
      method: 'GET',
      url: `${api}/api/test`
      // headers: ctx.headers
    }
    // const res = await reqLock(config)
    // console.log('🚀 ~ file: test.js:14 ~ test ~ res:', res)

    const configs = [
      config,
      {
        method: 'POST',
        url: `${api}/api/req`
      }
    ]
    const res = await reqAll(configs.map((c) => allFn(reqLock(c, false))))
    ctx.status = 200
    ctx.body = {
      val: 'hello',
      res
    }
  } catch (error) {
    ctx.status = error.status
    ctx.body = error.data
  }
}

module.exports = {
  test
}
