import {OpenAPI} from 'routing-controllers-openapi'

const JsonToHtml = (obj: any): any => {
  if (!obj || typeof obj === 'string') {
    return obj
  }

  return Object.keys(obj)
    .map((key) => {
      let value = obj[key]
      if (typeof obj[key] === 'object') {
        value = Object.values(obj[key])
      }
      return `${key}: ${value}`
    })
    .join('<br />')
}

export const OpenApiDesc = (spec: any): any => {
  return OpenAPI({
    ...spec,
    description: JsonToHtml(spec.description),
  })
}
