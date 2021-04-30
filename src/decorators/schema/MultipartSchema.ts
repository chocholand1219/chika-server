import * as _ from 'lodash'
import {OperationObject, RequestBodyObject} from 'openapi3-ts'
import {OpenAPI} from 'routing-controllers-openapi'
import {getFromContainer, MetadataStorage} from 'class-validator'
import {validationMetadatasToSchemas} from 'class-validator-jsonschema'

export const MultipartSchema = (
  responseClass: any,
  options: {
    description?: string
  } = {}
): any => {
  const setMultipartSchema = (source: OperationObject): OperationObject => {
    const description = options.description || ''
    let responseSchemaName = ''
    if (typeof responseClass === 'function' && responseClass.name) {
      responseSchemaName = responseClass.name
    } else if (typeof responseClass === 'string') {
      responseSchemaName = responseClass
    }

    const {validationMetadatas} = getFromContainer(MetadataStorage) as any
    const schema = validationMetadatasToSchemas(validationMetadatas)[
      responseSchemaName
    ]
    if (responseSchemaName) {
      const requestBody: RequestBodyObject = {
        content: {
          'multipart/form-data': {
            schema,
          },
        },
        description,
      }

      return _.merge({}, source, {requestBody})
    }

    return source
  }

  return OpenAPI(setMultipartSchema)
}
