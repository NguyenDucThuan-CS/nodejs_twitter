import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/untils/validate'
import userService from '~/services/users.services'
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }
  next()
}
//email, name, password, confirm password, date_of_birth
export const registerValidator = validate(
  checkSchema({
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await userService.checkUserExist(value)
          if (isExistEmail) {
            throw Error('User have been already exist')
          }
          return true
        }
      }
    },
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        }
      },
      trim: true
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 150
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        }
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 150
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
