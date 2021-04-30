import yenv from 'yenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export const configs = yenv('env.yaml', {
  logBeforeThrow: true,
})

export * from './utils'
