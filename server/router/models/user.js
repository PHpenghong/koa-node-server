const { register } = require('../../../controllers/userController')

const router = new (require('koa-router'))({ prefix: '/user' })

router.post('/register', register)

// router.use(childRouter.routes())

module.exports = router
