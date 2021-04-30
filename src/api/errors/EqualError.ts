import {MakeErrorClass} from 'fejl'

export default class EqualError extends MakeErrorClass('same value', {
  statusCode: 200,
}) {
  static customAssert(
    data1: any,
    data2: any,
    msgData: any,
    value: any = data1
  ): any {
    if (data1 === data2) {
      throw new this('same value', msgData)
    }
    return value
  }

  static makeCustomAssert(data2: any, msgData: any): any {
    return (value): any => this.customAssert(value, data2, msgData)
  }

  static makeFieldAssert(fieldName: string, data2: any, msgData: any): any {
    return (value): any =>
      value && this.customAssert(value[fieldName], data2, msgData, value)
  }
}
