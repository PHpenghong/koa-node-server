const Router = require('koa-router')

const router = new Router()
// const requestProxy = require('../server/request/request')
const { reqAll, request, reqLock } = require('../server/request/index')

const api = process.env.BASEURL_API

router.get('/test', async (ctx) => {
  try {
    console.log('in-----=')
    const config = {
      method: 'GET',
      url: `${api}/api/test`
      // headers: ctx.headers
    }
    // const res = await request(config)
    // const fn = reqLock(config, request, { exec: false, execFn: false })
    // const res = await fn()

    const configs = [
      config,
      {
        method: 'POST',
        url: `${api}/api/req`
      }
    ]
    const fns = configs.map((c) =>
      reqLock(c, request, { exec: false, execFn: false })
    )
    console.log('in=======fns', fns)
    const res = await reqAll(fns)
    console.log('🚀 ~ file: test.js:28 ~ test ~ res:', res)
    ctx.status = 200
    ctx.body = {
      val: 'hello',
      res
    }
  } catch (error) {
    ctx.status = error.status
    ctx.body = error.data
  }
})

module.exports = router
