import * as express from 'express'
import jwt from 'jsonwebtoken'
import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers'
import {Container} from 'typedi'
import {UserService} from '../../services/UserService'
import {User} from '@models/User'
import {env} from '@src/env'

@Middleware({type: 'before'})
export class AuthMiddleware implements ExpressMiddlewareInterface {
  userService = Container.get<UserService>(UserService)

  async use(
    req: express.Request & {user: User},
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const {} = req.headers.cookie
    if (req.cookies.accessToken) {
      const {accessToken} = req.cookies
      const decoded = jwt.verify(accessToken, env.ACCESS_PRIVATE_KEY)

      if (decoded && decoded.id) {
        req.user = await this.userService.findOne({
          where: {
            id: decoded.id,
          },
        })
      }
    }

    await Promise.resolve()
    next()
  }
}
