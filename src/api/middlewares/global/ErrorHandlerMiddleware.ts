import * as express from 'express'
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {env} from '@src/env'

@Middleware({type: 'after'})
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = env.isProduction

  constructor(@Logger(__filename) private log: LoggerInterface) {}

  error(
    error: HttpError & {
      errors: any
      statusCode: number
      status_code: number
      title: string
      extra_msg: string
    },
    req: express.Request,
    res: express.Response
  ): void {
    res.status(error.statusCode || 500)
    res.json({
      title: error.title,
      errors: error.errors || (error.message ? [error.message] : []),
      stack: error.stack,
    })

    if (this.isProduction) {
      this.log.error(error.title, error.message, error.stack)
    } else {
      console.log('Error Middleware: ', error)
    }
  }
}
