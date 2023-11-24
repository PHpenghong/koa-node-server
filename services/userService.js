const userDao = require('../dao/userDao')
const bcrypt = require('bcryptjs')

const getAllUsers = async () => await userDao.getAllUsers()

const getUserById = async (userId) => await userDao.getUserById(userId)

const getUserByEmail = async (ctx, email) => {
  const res = await userDao.getUserByEmail(email)
  return !!res.length
}

const createUser = async (username, email, password) => {
  const passwd = await bcrypt.hash(password, 10)
  const res = await userDao.createUser({ username, email, password: passwd })
  return !!res.dataValues
}

const updateUser = async (userId, userData) =>
  userDao.updateUser(userId, userData)

const deleteUser = async (userId) => await userDao.deleteUser(userId)

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
}
