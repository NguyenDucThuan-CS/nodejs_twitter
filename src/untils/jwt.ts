import jwt from 'jsonwebtoken'

export const signToken = ({
  payload,
  privateKey = process.env.PRIVATE_SECRET as string,
  option = { algorithm: 'HS256' }
}: {
  payload: string | Buffer | object
  privateKey?: string
  option?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, option, function (err, token) {
      if (err) {
        throw reject(err)
      }
      return resolve(token as string)
    })
  })
}
