import { Request, Response } from 'express'
import userService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'nguyenthuan@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login success'
    })
  }

  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })
    return res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    console.log(error)
  }
}
