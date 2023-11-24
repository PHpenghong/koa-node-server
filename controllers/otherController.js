/* global redisClient */
const svgCaptcha = require('svg-captcha')

const getCaptcha = async (ctx) => {
  const { timer } = ctx.params
  const cap = svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 3,
    // 宽度
    width: 80,
    // 高度
    height: 30
  })
  redisClient.setEx(`${timer}`, 60 * 3, cap.text.toLowerCase())
  // req.session.captcha = cap.text // session 存储验证码数值
  ctx.type = 'svg' // 响应的类型
  ctx.status = 200
  ctx.body = cap.data
}

// router.get('/captcha/:timer', )

module.exports = {
  getCaptcha
}
