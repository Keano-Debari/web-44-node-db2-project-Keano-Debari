// DO YOUR MAGIC
const express = require('express')

const router = express.Router()

const Car = require('./cars-model')

const imports = require('./cars-middleware')
const checkCarId = imports.checkCarId
const checkCarPayload = imports.checkCarPayload
const checkVinNumberValid = imports.checkVinNumberValid
const checkVinNumberUnique = imports.checkVinNumberUnique

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.status(200).json(cars)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    const {id} = req.params
    try {
        const carId = await Car.getById(id)
        res.status(200).json(carId)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    const newCar = req.body
    try {
        const createCar = await Car.create(newCar)
        res.status(201).json(createCar)
    }
    catch (err) {
        next(err)
    }
})