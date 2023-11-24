const { sequelize, Op } = require('../server/db/mysql')

const user = require('./user')
const role = require('./role')
const router = require('./router')
const role_router_user = require('./role_router_user')

sequelize
  .sync({ alter: true })
  .then(() => console.log('所有模型均已成功同步.'))
  .catch((error) => {
    console.error('数据库同步失败:', error)
  })
module.exports = {
  Op,
  user,
  role,
  router,
  role_router_user
}
