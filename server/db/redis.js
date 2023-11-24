const redis = require('redis')

const client = redis.createClient({
  url: `redis://${process.env.REDIS_CONFIG_USER}:${
    process.env.REDIS_CONFIG_PWD
  }@${process.env.REDIS_CONFIG_HOST || '172.0.0.1'}:${
    process.env.REDIS_CONFIG_PORT || '6379'
  }`
})

client.on('connect', () => {
  console.log('redis connect')
})

client.on('error', function (err) {
  console.log(`redis Error ${err}`)
})

client.connect()

global.redisClient = client
module.exports = client

/**
 * 新增
 * redisClient.set('key', 'value');
 *
 * redisClient.setex('key', 60, 'value'); // 过期时间为60秒
 *
 * 删除
 * redisClient.del('key');
 *
 * 更新
 * redisClient.set('key', 'newValue');
 *
 * 获取
 * redisClient.get('key');
 *
 * 验证是否过期
 * redisClient.exists('key');
 *
 * 剩余有效时间
 * redisClient.ttl('key');
 *
 */
