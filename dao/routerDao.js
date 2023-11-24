const Router = require('../models/router')

const getRouterById = async (id) => Router.findByPK(id)

const getRouterAll = async (status = 1) => Router.findAll({ where: { status } })

const updateRouterById = async (id, updateData) =>
  Router.update(updateData, { where: { id } })

const createRouter = async (data) => Router.create(data)

const delRouterById = async (id) =>
  Router.update({ status: 2 }, { where: { id } })

module.exports = {
  getRouterById,
  getRouterAll,
  updateRouterById,
  createRouter,
  delRouterById
}
