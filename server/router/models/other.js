const Router = require('koa-router')
const childRouter = require('../../../controllers/test')

const router = new Router()

// router.get('/test', test)

router.use(childRouter.routes())

module.exports = router
