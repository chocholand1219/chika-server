import {Application} from 'express'
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec'
import {createExpressServer} from 'routing-controllers'

import {authorizationChecker} from '../auth/authorizationChecker'
import {currentUserChecker} from '../auth/currentUserChecker'

import {env} from '../env'

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const expressApp: Application = createExpressServer({
      cors: true,
      classTransformer: true,
      routePrefix: env.app.routePrefix,
      defaultErrorHandler: false,

      middlewares: env.app.dirs.middlewares,
      controllers: env.app.dirs.controllers,
      interceptors: env.app.dirs.interceptors,

      authorizationChecker: authorizationChecker(),
      currentUserChecker: currentUserChecker(),
    })

    // Run application to listen on given port
    if (!env.isTest) {
      const server = expressApp.listen(env.app.port)
      settings.setData('express_server', server)
    }

    // Here we can set the data for other loaders
    settings.setData('express_app', expressApp)
  }
}
