import * as express from 'express'
import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers'
import bodyParser from 'body-parser'

@Middleware({type: 'before'})
export class BodyParserMiddleware implements ExpressMiddlewareInterface {
  use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    return bodyParser.json()(req, res, next)
  }
}
