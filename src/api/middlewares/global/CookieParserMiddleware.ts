import * as express from 'express'
import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers'
import cookieParser from 'cookie-parser'

@Middleware({type: 'before', priority: 9})
export class CookieParserMiddleware implements ExpressMiddlewareInterface {
  use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    return cookieParser()(req, res, next)
  }
}
