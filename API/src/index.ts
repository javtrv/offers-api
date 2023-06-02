import express from 'express'
import offersRouter from './routes/offers.route'
import usersRouter from './routes/users.route'

const app = express()
app.use(express.json())

app.use('/offers', offersRouter)
app.use('/users', usersRouter)

app.use((_, res) => {
  res.status(404).send('Not found')
})

const PORT = 3000
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default { app, server }
