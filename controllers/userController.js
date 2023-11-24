/* global redisClient */

const { resCode, errCode } = require('../server/utils/resCode')
const userService = require('../services/userService')
const Joi = require('joi')

const getAllUsers = async (ctx) => {
  try {
    const users = await userService.getAllUsers()
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = errCode[500]
  }
}

const getUserById = async (ctx) => {
  const userId = ctx.params.id
  try {
    const user = await userService.getUserById(userId)
    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = errCode[500]
  }
}

const login = async (ctx) => {
  const { email, password, code, timer } = ctx.params
  let codeVal = false
  if (redisClient.exists(`${timer}`) != true) {
    const strCode = await redisClient.get(`${timer}`)
    if (strCode != code) {
      redisClient.del(`${timer}`)
      ctx.body = resCode(1001, '验证码不正确')
      codeVal = true
    }
  } else {
    redisClient.del(`${timer}`)
    ctx.body = resCode(1001, '验证码已过期')
    codeVal = true
  }
  redisClient.del(`${timer}`)
  if (codeVal) return
  const selectEmail = await userService.getUserByEmail(email)
  console.log(
    '🚀 ~ file: userController.js:50 ~ login ~ selectEmail:',
    selectEmail
  )
}

const register = async (ctx) => {
  try {
    const body = ctx.request.body
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required()
    })
    const result = schema.validate(body)
    if (result.error) {
      ctx.throw(400, result.error.message)
    }

    const { username, email, password } = body
    const isEmail = await userService.getUserByEmail(ctx, email)
    if (isEmail) {
      ctx.body = resCode(1002, '邮箱已存在')
      return
    }
    const isCreate = await userService.createUser(username, email, password)
    if (!isCreate) {
      ctx.body = resCode(1002, '注册失败')
      return
    }
    ctx.body = {
      msg: '用户注册成功'
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = errCode[500]
  }
}

// 可以添加其他路由处理函数，如创建用户、更新用户、删除用户等

module.exports = {
  login,
  getAllUsers,
  getUserById,
  register
  // 添加其他路由处理函数
}
