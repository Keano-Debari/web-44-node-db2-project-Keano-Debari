const Car = require('./cars-model')

const vinValidator = require('vin-validator')

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.params.id)
    if(car) {
      req.car = car
      next()
    }
    else {
      res.status(404).json({message: "car with id <car id> is not found"})
    }
  }
  catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body
  if(vin && make && model && mileage) {
    next()
  }
  else {
    res.status(400).json({message: "<field name> is missing"})
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValidVin = vinValidator.validate('11111111111111111')
  if(isValidVin) {
    next()
  }
  else {
    res.status(400).json({message: "vin <vin number> is invalid"})
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Car.getAll()
  .then(vin => {
    const existingVin = vin.find((car) => {
      return car
    })
    if(existingVin) {
      return res.status(400).json({message: "vin <vin number> already exists"})
    }
    else {
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}
