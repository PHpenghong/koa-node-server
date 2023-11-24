const { DataTypes, sequelize } = require('../server/db/mysql')

module.exports = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER(11),
    allowNull: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: 1
  }
  // create_time: {
  //   type: DataTypes.DATE(),
  //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  //   allowNull: false
  // },
  // last_update_time: {
  //   type: DataTypes.DATE(),
  //   defaultValue: sequelize.literal(
  //     'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
  //   ),
  //   allowNull: false
  // }
})
