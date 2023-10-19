import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.service'
const app = express()
const router = express.Router()

const port = 3000
app.use(express.json())
app.post('/', (req, res) => {
  res.send('Hello world')
})

app.use('/users', usersRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Loi la', err.message)
  res.status(400).json({ message: err.message })
})

databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
