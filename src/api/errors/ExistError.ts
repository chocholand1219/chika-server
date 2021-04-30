import {MakeErrorClass} from 'fejl'

export default class ExistError extends MakeErrorClass('exists', {
  statusCode: 200,
}) {
  static customAssert(value: any, msgData: any, data: any = value): any {
    if (value) {
      throw new this('exists', msgData)
    }

    return data
  }

  static makeCustomAssert(msgData: any): any {
    return (value): any => this.customAssert(value, msgData)
  }

  static makeFieldAssert(fieldName: string, msgData: any): any {
    return (value): any => this.customAssert(value[fieldName], msgData, value)
  }
}
