const { getCaptcha } = require('../../../controllers/otherController')

const router = new (require('koa-router'))()

router.get('/captcha/:timer', getCaptcha)

// router.use(childRouter.routes())

module.exports = router
