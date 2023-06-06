import supertest from 'supertest'
import app from '../index'
import { getUserById, getUsers, getFavoriteOffersOfUser, addFavoriteOfferToUser, removeFavoriteOfferFromUser, isFavoriteOfferOfUser } from '../services/users.services'

test('Existe el usuario', () => {
  const result = getUsers()
  expect(result.length).toBe(1)
})

test('No existe el usuario', () => {
  const result = getUserById('2')
  expect(result).toBe(undefined)
})

test('Existe el usuario hardcode', () => {
  const result = getUserById('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36')
  expect(result?.name).toBe('Javier Medina')
})

test('Oferta favorita', () => {
  const result = getFavoriteOffersOfUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', 1)
  expect(result?.length).toBe(1)
  expect(result?.[0].amount).toBe(5000)
})

test('Agregar oferta', () => {
  const result = addFavoriteOfferToUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', 'b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
  expect(result?.favoriteOffers.length).toBe(2)
  expect(result?.favoriteOffers[1]).toBe('b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
})

test('Agregar oferta duplicada', () => {
  const result = addFavoriteOfferToUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', 'b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
  expect(result?.favoriteOffers.length).toBe(2)
  expect(result?.favoriteOffers[1]).toBe('b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
})

test('Agregar oferta a usuario inexistente', () => {
  const result = addFavoriteOfferToUser('2', 'b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
  expect(result).toBe(undefined)
})

test('Agregar oferta inexistente', () => {
  const result = addFavoriteOfferToUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', '2')
  expect(result?.favoriteOffers.length).toBe(2)
})

test('Quitar oferta de favoritos', () => {
  const result = removeFavoriteOfferFromUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', 'b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
  expect(result?.favoriteOffers.length).toBe(1)
  expect(result?.favoriteOffers[0]).toBe('3c20c742-587f-453e-9e75-1e343e64d8e7')
})

test('Quitar oferta de favoritos inexistente', () => {
  const result = removeFavoriteOfferFromUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', '2')
  expect(result?.favoriteOffers.length).toBe(1)
  expect(result?.favoriteOffers[0]).toBe('3c20c742-587f-453e-9e75-1e343e64d8e7')
})

test('Oferta es favorita', () => {
  const result = isFavoriteOfferOfUser('e88b0e82-24ab-4f0c-9e46-8f0be16a3d36', '3c20c742-587f-453e-9e75-1e343e64d8e7')
  expect(result).toBe(true)
})

const api = supertest(app.app)

test('Prueba endpoint /users/', async () => {
  const response = await api.get('/users/')
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(1)
})

test('Prueba endpoint /users/:id', async () => {
  const response = await api.get('/users/e88b0e82-24ab-4f0c-9e46-8f0be16a3d36')
  expect(response.status).toBe(200)
  expect(response.body.data.name).toBe('Javier Medina')
})

test('Prueba endpoint /users/:id/favoriteOffers', async () => {
  const response = await api.get('/users/e88b0e82-24ab-4f0c-9e46-8f0be16a3d36/favoriteOffers/10')
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(1)
  expect(response.body.data[0].amount).toBe(5000)
})

test('Prueba endpoint /users/:id/favoriteOffer/:offerId', async () => {
  const response = await api.get('/users/e88b0e82-24ab-4f0c-9e46-8f0be16a3d36/favoriteOffer/3c20c742-587f-453e-9e75-1e343e64d8e7')
  expect(response.status).toBe(200)
  expect(response.body.data).toBe(true)
})

test('Prueba endpoint /users/:id/favoriteOffer/:offerId', async () => {
  const response = await api.get('/users/e88b0e82-24ab-4f0c-9e46-8f0be16a3d36/favoriteOffer/2')
  expect(response.status).toBe(200)
  expect(response.body.data).toBe(false)
})

test('Prueba POST endpoint /users/:id/favoriteOffer/:offerId', async () => {
  const response = await api.post('/users/e88b0e82-24ab-4f0c-9e46-8f0be16a3d36/favoriteOffer/b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
  expect(response.status).toBe(200)
  expect(response.body.data.favoriteOffers.length).toBe(2)
  expect(response.body.data.favoriteOffers[1]).toBe('b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
})

test('Prueba DELETE endpoint /users/:id/favoriteOffer/:offerId', async () => {
  const response = await api.delete('/users/e88b0e82-24ab-4f0c-9e46-8f0be16a3d36/favoriteOffer/3c20c742-587f-453e-9e75-1e343e64d8e7')
  expect(response.status).toBe(200)
  expect(response.body.data.favoriteOffers.length).toBe(1)
  expect(response.body.data.favoriteOffers[0]).toBe('b4e91347-3b34-4fc9-a5cc-ee7b39f71e5b')
})

afterAll(() => {
  app.server.close()
})
