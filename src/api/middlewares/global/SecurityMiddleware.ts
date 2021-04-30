import * as express from 'express'
import helmet from 'helmet'
import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers'

@Middleware({type: 'before'})
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    return helmet()(req, res, next)
  }
}
