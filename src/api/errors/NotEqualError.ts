import {MakeErrorClass} from 'fejl'
import _ from 'lodash'

export default class NotEqualError extends MakeErrorClass('different value', {
  statusCode: 200,
}) {
  static customAssert(
    data1: any,
    data2: any,
    msgData: any,
    value: any = data1
  ): any {
    if (data1 !== data2) {
      throw new this('different value', msgData)
    }
    return value
  }

  static makeCustomAssert(data2: any, msgData: any): any {
    return (value): any => this.customAssert(value, data2, msgData)
  }

  static makeFieldAssert(fieldKey: string, data2: any, msgData: any): any {
    return (value): any =>
      this.customAssert(_.get(value, fieldKey), data2, msgData, value)
  }
}
