const maxConn = 6
let conn = 0
const queue = []

const lock = (fn) =>
  new Promise((resolve, reject) => {
    const request = async () => {
      try {
        const res = await fn()
        resolve(res)
      } catch (error) {
        reject(error)
      } finally {
        conn--
        next()
      }
    }

    conn++
    if (conn >= maxConn) {
      queue.push(request)
    } else {
      request()
    }

    const next = () => {
      if (queue.length === 0) {
        return
      }
      const req = queue.shift()
      req()
    }
  })

module.exports = lock
