import express from 'express'
import userRouter from './user.routes'
import databaseService from './services/database.service'
const app = express()
const router = express.Router()

const port = 3000

app.post('/', (req, res) => {
  res.send('Hello world')
})

app.use('/users', userRouter)
databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
