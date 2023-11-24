const { DataTypes, sequelize } = require('../server/db/mysql')

module.exports = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  router: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    defaultValue: 1
  }
})
