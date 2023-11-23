const Router = require('koa-router')

const appRouter = new Router({ prefix: '/api' })

// 路由模块
const moduleMap = {
  other: require('./models/other')
}

Object.keys(moduleMap).forEach((m) => {
  appRouter.use(moduleMap[m].routes())
})

const router = new Router()
router.use(appRouter.routes())

module.exports = router
