const { Sequelize, DataTypes, Op } = require('sequelize') // 引入sequelize依赖

// if (!global.sequelize) {
// }

const sequelize = new Sequelize({
  database: 'mytab',
  username: 'penghong',
  password: 'penghong',
  host: 'localhost',
  post: '3306',
  dialect: 'mysql',
  pool: {
    max: 10, // 最大连接数
    min: 0, // 最小连接数
    acquire: 30000, // 连接超时时间
    idle: 10000 // 连接空闲时间
  }
})
sequelize
  .authenticate()
  .then(() => {
    console.info('Connection has been established successfully.')
    global.sequelizeMysql = sequelize
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = {
  sequelize,
  DataTypes,
  Op
}

// const DataTypes = {
//   STRING: '字符串类型，用于存储文本数据',
//   BOOLEAN: '布尔类型，用于存储真/假值',
//   CHAR: '定长字符串类型，用于存储固定长度的字符',
//   TEXT: '文本类型，用于存储较长的文本数据',
//   INTEGER: '整数类型，用于存储整数数据',
//   ENUM: `枚举类型，用于存储一组预定义的值  DataTypes.ENUM('value1', 'value2', 'value3')`,
//   DATE: 'DataTypes.DATE',
//   TIME: 'DataTypes.TIME',
//   DATEONLY: '仅日期类型，用于存储日期数据（不包含时间',
//   NOW: '特殊的 DataTypes，表示当前日期和时间',
//   BIGINT: '大整数类型，用于存储大整数数据',
//   FLOAT: '浮点数类型，用于存储小数数据',
//   DOUBLE: '双精度浮点数类型，用于存储双精度小数数据',
//   DECIMAL: '十进制数类型，用于存储精确小数数据',
//   UUID: '数组类型，用于存储数组数据  DataTypes.ARRAY(DataTypes.STRING)',
//   JSON: 'JSON 类型，用于存储 JSON 格式的数据'
// }

// const keyObj = {
//   type: '字段类型',
//   allowNull: '是否允许为空',
//   primaryKey: '是否是主键',
//   autoIncrement: '是否自增',
//   defaultValue: '默认值',
//   unique: '是否唯一',
//   validate:
//     '验证规则 / 例如，可以设置 validate: { isEmail: true } 来验证邮箱格式. Sequelize 内置了一些验证规则，也可以自定义验证函数',

//   references: '外键关联的表',
//   referencesKey: '外键关联的字段',
//   comment: '注释'
// }
