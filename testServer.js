const Koa = require('koa')
const app = new Koa()
const PORT = process.env.PORT || 3001

// 定义接口路径为 /api/test
app.use(async (ctx) => {
  if (ctx.path === '/api/test' && ctx.method === 'GET') {
    // 在这里处理接口逻辑
    ctx.body = { message: 'This is a simple API test.' }
  } else if (ctx.path === '/api/req' && ctx.method === 'POST') {
    ctx.status = 200
    ctx.body = {
      code: 0,
      list: [1, 2, 3, 4, 5, 6, 7]
    }
  } else {
    // 其他路径返回 404
    ctx.status = 404
    ctx.body = { error: 'Not Found' }
  }
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
