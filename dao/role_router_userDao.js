const RoleRouterUser = require('../models//role_router_user')

const getRoleById = async (id) => RoleRouterUser.findByPK(id)

const getRoleAll = async (status = 1) =>
  RoleRouterUser.findAll({ where: { status } })

const updateRoleById = async (id, updateData) =>
  RoleRouterUser.update(updateData, { where: { id } })

const createRole = async (data) => RoleRouterUser.create(data)

const delRoleById = async (id) =>
  RoleRouterUser.update({ status: 2 }, { where: { id } })

module.exports = {
  getRoleById,
  getRoleAll,
  updateRoleById,
  createRole,
  delRoleById
}
