const Role = require('../models/role')

const getRoleById = async (id) => Role.findByPK(id)

const getRoleAll = async (status = 1) => Role.findAll({ where: { status } })

const updateRoleById = async (id, updateData) =>
  Role.update(updateData, { where: { id } })

const createRole = async (data) => Role.create(data)

const delRoleById = async (id) => Role.update({ status: 2 }, { where: { id } })

module.exports = {
  getRoleById,
  getRoleAll,
  updateRoleById,
  createRole,
  delRoleById
}
