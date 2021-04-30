import {MakeErrorClass} from 'fejl'

export default class NotFoundError extends MakeErrorClass('oops!! not found', {
  statusCode: 404,
}) {
  static customAssert(data: any, msgData: any, value: any = data): any {
    if (data === undefined || data === null) {
      throw new this(msgData)
    }
    return value
  }

  static makeCustomAssert(msgData?: any): any {
    return (value): any => this.customAssert(value, msgData)
  }

  static makeFieldAssert(fieldName: string, msgData: any): any {
    return (value): any => this.customAssert(value[fieldName], msgData, value)
  }
}
