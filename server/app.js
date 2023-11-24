require('./utils/global')

global.redisClient = require('./db/redis')

const dealWithProt = (port) => {
  let res = 3000
  try {
    const protInt = parseInt(port)
    if (typeof protInt === 'number' && protInt > 999 && protInt < 65535) {
      res = protInt
    } else {
      throw 'port err'
    }
  } catch (e) {
    res = 3000
  }
  return res
}

module.exports = function (portVal = 3000) {
  const koa = new (require('koa'))()
  const router = require('./router/index')
  const path = require('path')
  const koaStatic = require('koa-static')
  const bodyParser = require('koa-bodyparser')
  const koaLogger = require('koa-logger')
  const { verifyToken } = require('./jwt/index')
  const { whileUrlJWT } = require('./utils/whileUrl')

  require('./db/initSequelize')

  // 全局错误处理中间件
  koa.on('error', (err) => {
    console.error('Global error handler:', err.message)
    // 这里可以进行全局错误处理
  })

  koa.use(async (ctx, next) => {
    await next()
    if (ctx.status === 404) {
      ctx.status = 404
      ctx.body = '404 Not Found'
    }
  })

  // 配置控制台日志中间件
  koa.use(koaLogger())

  // 配置ctx.body解析中间件
  koa.use(bodyParser())

  // 配置静态资源加载中间件
  koa.use(koaStatic(path.join(__dirname, '../static')))

  // jwt验证
  koa.use(verifyToken(whileUrlJWT()))

  // 路由模块
  koa.use(router.routes()).use(router.allowedMethods())

  const port = dealWithProt(portVal)
  koa.listen(port, () => console.log(`服务启动成功：http://localhost:${port}`))
}
