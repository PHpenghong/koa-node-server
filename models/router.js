const { DataTypes, sequelize } = require('../server/db/mysql')

module.exports = sequelize.define('router', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(21),
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  path: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  sort: {
    type: DataTypes.STRING(11),
    allowNull: true
  },
  redirect: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  title2: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  hidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isEdit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  keepAlive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  parentRoute: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: 1
  },
  create_time: {
    type: DataTypes.DATE(),
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  last_update_time: {
    type: DataTypes.DATE(),
    defaultValue: sequelize.literal(
      'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ),
    allowNull: false
  }
})
