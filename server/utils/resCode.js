const codeMap = {
  0: '',
  1001: '资源不存在 | 已过期',
  1002: '资源已存在'
}

const errCode = {
  404: 'Not Found',
  500: 'Internal Server Error'
}

const resCode = (code = 0, msg = '', args = {}) => ({
  code,
  msg: msg || codeMap[code] || '',
  ...args
})

module.exports = {
  resCode,
  errCode
}
