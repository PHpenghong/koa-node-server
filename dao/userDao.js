const User = require('../models/user')

const getAllUsers = async (status = 1) => User.findAll({ where: { status } })

const getUserById = async (id) => User.findByPk(id)

const getUserByEmail = async (email, status = 1) =>
  User.findAll({ where: { email, status } })

const createUser = async (userData) => {
  console.log(userData)
  return await User.create(userData)
}
const updateUser = async (userId, userData) =>
  User.update(userData, { where: { id: userId } })

const deleteUser = async (userId) =>
  User.update({ status: '2' }, { where: { id: userId } })

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  getUserByEmail,
  deleteUser
}
