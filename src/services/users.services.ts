import User from '~/models/schemas/User.schema'
import databaseService from './database.service'
import { RegisterReqBody } from '~/models/requests/User.request'
import { hashPassword } from '~/untils/crypto'
import { signToken } from '~/untils/jwt'
import { TokenType } from '~/constants/enums'
class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, type: TokenType.AccessToken },
      option: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, type: TokenType.RefreshToken },
      option: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const userId = result.insertedId.toString()

    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(userId),
      this.signRefreshToken(userId)
    ])
    return {
      access_token,
      refresh_token
    }
  }
  async checkUserExist(email: string) {
    return Boolean(await databaseService.users.findOne({ email }))
  }
  constructor() {}
}

const userService = new UsersService()

export default userService
