import supertest from 'supertest'
import app from '../index'
import { getOffers, getOfferById } from '../services/offers.services'

test('Prueba 10 elementos', () => {
  const result = getOffers(10)
  expect(result.length).toBe(10)
})

test('Prueba 50 elementos', () => {
  const result = getOffers(50)
  expect(result.length).toBe(50)
})

test('Elemento con todos los campos', () => {
  const result = getOfferById('3c20c742-587f-453e-9e75-1e343e64d8e7')
  expect(result?.amount).toBe(5000)
})

test('Elemento no encontrado', () => {
  const result = getOfferById('3c20c742-587f-453e-9e75-1e343e64d8e8')
  expect(result).toBe(undefined)
})

const api = supertest(app.app)

test('Prueba de la ruta /offers/quantity/:quantity', async () => {
  await api
    .get('/offers/quantity/10')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Prueba de la ruta /offers/quantity/:quantity y que traiga 50', async () => {
  const response = await api.get('/offers/quantity/50')
  expect(response.body.data.length).toBe(50)
})

test('Prueba de la ruta /offers/', async () => {
  await api
    .get('/offers/')
    .expect(404)
    .expect('Content-Type', /application\/json/)
})

test('Prueba de la ruta /offers/:id', async () => {
  await api
    .get('/offers/3c20c742-587f-453e-9e75-1e343e64d8e7')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Prueba de la ruta /offers/:id y que traiga el elemento correcto', async () => {
  const response = await api.get('/offers/3c20c742-587f-453e-9e75-1e343e64d8e7')
  expect(response.body.data.amount).toBe(5000)
  expect(response.body.data.id).toBe('3c20c742-587f-453e-9e75-1e343e64d8e7')
  expect(response.body.data.provider).toBe('Bank A')
})

afterAll(() => {
  app.server.close()
})
