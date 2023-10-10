import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'

// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: any) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.mapped() })
  }
}
