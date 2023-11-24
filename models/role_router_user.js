const { DataTypes, sequelize } = require('../server/db/mysql')
const role = require('./role')
const user = require('./user')

module.exports = sequelize.define('role_router_user', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  role_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: role,
      key: 'id'
    }
    // referencesKey: 'id'
  },
  user_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: user,
      key: 'id'
    }
  },
  router: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: 1
  }
})
