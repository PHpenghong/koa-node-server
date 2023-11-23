// jwtMiddleware.js

const jwt = require('jsonwebtoken')

const secretKey = 'ph-secret-key' // 替换为实际的密钥

const token_time = 60

const dealWithTimer = (time) => {
  if (!time) return false
  const now = Date.now()
  const d = new Date(time)
  const diff = (now - d) / 1000
  return diff < 3600 && diff / 60 > token_time - 5
}

const dealWithToken = (token) => {
  try {
    if (!token) throw 'token err'
    const num = parseInt(token.slice(0, 1))
    if (typeof num === 'number') {
      return token.slice(1, token.length - num)
    }
    throw 'token err'
  } catch (error) {
    return
  }
}

// 生成token
/**
 *
 * @param {any} data 生成token的源数据
 * @returns
 */
const generateToken = (data) =>
  jwt.sign(data, secretKey, { expiresIn: 60 * token_time })

/**
 *
 * @param {String[]} whiteUrl 白名单路由
 * @param {String} userInfo 验证token后将用户信息绑定到上下文的该字段上
 * @returns
 */
const verifyToken = (whiteUrl, userInfo = 'userInfo') => {
  const whitelist = whiteUrl
  return async function jwtMiddleware(ctx, next) {
    try {
      // 检查是否在白名单中
      if (!whitelist.includes(ctx.path.replace('/api/', ''))) {
        if (
          !ctx.headers.authorization ||
          !ctx.headers.authorization.startsWith('Bearer') ||
          !ctx.headers.authorization.split(' ')[1]
        ) {
          throw new Error('No token provided')
        }
        const token = dealWithToken(ctx.headers.authorization.split(' ')[1])
        if (!token) {
          throw new Error('No token provided')
        }

        // 验证 JWT
        const decoded = dealWithToken(jwt.verify(token, secretKey))
        let newToken = null
        if (dealWithTimer(decoded.timer)) {
          newToken = await generateToken(decoded.id, +new Date())
          ctx.set({
            'New-Token': newToken
          })
        }

        // 将解码后的用户信息添加到上下文中
        ctx.state[userInfo] = decoded
      }
      // ctx.response.headers.newToken = '12345w'

      await next()
    } catch (err) {
      ctx.status = 401
      ctx.body = { error: '登录过期，请重新登录' }
    }
  }
}

module.exports = {
  verifyToken,
  generateToken
}
