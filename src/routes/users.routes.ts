import express from 'express'
import { loginValidator } from '~/middlewares/users.milddlewares'
import { loginController, registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.milddlewares'

const usersRouter = express.Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post(
  '/register',
  registerValidator,
  (req, res, next) => {
    console.log('request handler 1')
    next(new Error('cmn'))
  },
  (req, res, next) => {
    next(new Error('Loi roi'))
  },
  (req, res, next) => {
    console.log('123')
    res.json({ message: 'register success' })
  },
  (err, req, res, next) => {
    console.log('Loi la', err.message)
    res.status(400).json({ error: err.message })
  }
)

export default usersRouter
