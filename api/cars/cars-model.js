const db = require('../../data/db-config')

module.exports = {
  getAll,
  getById,
  create
}

const getAll = async () => {
  // DO YOUR MAGIC
  const records = await db('cars')
  return records
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const record = await db('cars').where('id', id).first()
  return record
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car)
  const newCar = await getById(id)
  return newCar
}
