import express from 'express'
import { getOfferById, getOffers } from '../services/offers.services'

const router = express.Router()

router.get('/quantity/:quantity', (req, res, next) => {
  const offers = getOffers(parseInt(req.params.quantity))
  if (offers !== null && offers !== undefined) {
    res.status(200).send({
      status: 'success',
      data: offers,
      code: 200
    })
  } else {
    next()
  }
})

router.get('/:id', (req, res, next) => {
  const offer = getOfferById(req.params.id)
  if (offer !== null && offer !== undefined) {
    res.status(200).send({
      status: 'success',
      data: offer,
      code: 200
    })
  } else {
    next()
  }
})

router.use((_, res) => {
  res.status(404).send({
    status: 'resource not found',
    data: null,
    code: 404
  })
})

export default router
