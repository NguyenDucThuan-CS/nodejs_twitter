import express from 'express'
import { loginValidator } from '~/middlewares/users.milddlewares'
import { loginController, registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.milddlewares'

const usersRouter = express.Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
