import express from 'express'
import { getUsers, getUserById, getFavoriteOffersOfUser, addFavoriteOfferToUser } from '../services/users.services'
const router = express.Router()

router.get('/', (_, res, next) => {
  const users = getUsers()
  if (users !== null && users !== undefined) {
    res.status(200).send({
      status: 'success',
      data: users,
      code: 200
    })
  } else {
    next()
  }
})

router.get('/:id', (req, res, next) => {
  const user = getUserById(req.params.id)
  if (user !== null && user !== undefined) {
    res.status(200).send({
      status: 'success',
      data: user,
      code: 200
    })
  } else {
    next()
  }
})

router.get('/:id/favoriteOffers', (req, res, next) => {
  const favoriteOffers = getFavoriteOffersOfUser(req.params.id)
  if (favoriteOffers !== null && favoriteOffers !== undefined) {
    res.status(200).send({
      status: 'success',
      data: favoriteOffers,
      code: 200
    })
  } else {
    next()
  }
})

router.post('/:id/favoriteOffers/:offerId', (req, res, next) => {
  const user = addFavoriteOfferToUser(req.params.id, req.params.offerId)
  if (user !== null && user !== undefined) {
    res.status(200).send({
      status: 'success',
      data: user,
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
