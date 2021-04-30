import {join} from 'path'

export const getOsEnv = (key: string): string => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`)
  }

  return process.env[key]
}

export const getOsEnvOptional = (key: string): string | undefined => {
  return process.env[key]
}

export const getPath = (path: string): string => {
  return process.env.NODE_ENV === 'production'
    ? join(process.cwd(), `${path.replace('src/', 'dist/').slice(0, -3)}.js`)
    : join(process.cwd(), path)
}

export const getPaths = (paths: string[]): string[] => {
  return paths.map((p) => getPath(p))
}

export const getOsPath = (key: string): string => {
  return getPath(getOsEnv(key))
}

export const getOsPaths = (key: string): string[] => {
  return getPaths(getOsEnvArray(key))
}

export const getOsEnvArray = (key: string): string[] => {
  return (process.env[key] && process.env[key].split(',')) || []
}

export const toNumber = (value: string): number => {
  return parseInt(value, 10)
}

export const toBool = (value: string): boolean => {
  return typeof value === 'string' ? value === 'true' : value
}

export const normalizePort = (port: string): number | string | boolean => {
  const parsedPort = parseInt(port, 10)
  if (isNaN(parsedPort)) {
    // named pipe
    return port
  }
  if (parsedPort >= 0) {
    // port number
    return parsedPort
  }
  return false
}

export const jsonStrToArr = (str: string): any => {
  const result = []
  const Json_str = JSON.parse(str)

  for (const i in Json_str) {
    result.push(Json_str[i])
  }

  return result
}

export const parseRowDataPacket = (data: object): any => {
  const json_strfy = JSON.stringify(data)
  const json_parse = JSON.parse(json_strfy)

  return json_parse
}

export const encodeString = (data: string): any => {
  const parsedBuffer = data.replace(/</g, '%').replace(/>/g, '')

  return decodeURI(parsedBuffer)
}
