import * as dotenv from 'dotenv'
import * as path from 'path'

import * as pkg from '../package.json'
import {
  getOsEnv,
  getOsEnvOptional,
  normalizePort,
  toBool,
  toNumber,
  getPath,
  getPaths,
  configs,
} from './lib/env'

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    __dirname,
    '../',
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  ),
})

/**
 * Environment variables
 */

export const env = {
  ...configs,
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isStaging: process.env.NODE_ENV === 'staging',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: configs.APP_NAME,
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: configs.APP_HOST,
    schema: configs.APP_SCHEMA,
    routePrefix: configs.APP_ROUTE_PREFIX,
    port: normalizePort(process.env.PORT || configs.APP_PORT),
    banner: toBool(getOsEnv('APP_BANNER')),
    dirs: {
      migrations: getPaths(configs.MIGRATIONS),
      migrationsDir: getPath(configs.MIGRATIONS_DIR),
      entities: getPaths(configs.ENTITIES),
      entitiesDir: getPath(configs.ENTITIES_DIR),
      controllers: getPaths(configs.CONTROLLERS),
      middlewares: getPaths(configs.MIDDLEWARES),
      interceptors: getPaths(configs.INTERCEPTORS),
      subscribers: getPaths(configs.SUBSCRIBERS),
      resolvers: getPaths(configs.RESOLVERS),
    },
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnv('LOG_OUTPUT'),
  },
  db: {
    type: configs.type,
    host: configs.host,
    port: toNumber(configs.port),
    username: configs.db_username,
    password: String(configs.password),
    database: configs.database,
    migrations: configs.migrations,
    entities: configs.entities,
    seeds: configs.seeds,
    factories: configs.factories,
    synchronize: toBool(configs.synchronize),
    logging: configs.logging,
    cli: {
      migrationsDir: configs.migrations_dir,
      entitiesDir: configs.entities_dir,
    },
  },
  swagger: {
    enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
    route: getOsEnv('SWAGGER_ROUTE'),
    username: getOsEnv('SWAGGER_USERNAME'),
    password: getOsEnv('SWAGGER_PASSWORD'),
  },
}
