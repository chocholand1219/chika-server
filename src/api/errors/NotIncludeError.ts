import {MakeErrorClass} from 'fejl'

export default class NotIncludeError extends MakeErrorClass('not found', {
  statusCode: 200,
}) {
  static customAssert(
    fieldValue: string,
    arr: string[],
    msgData: any,
    value: any
  ): any {
    if (Boolean(arr.length) && !arr.includes(fieldValue)) {
      throw new this('not include', msgData)
    }
    return value
  }

  static makeCustomAssert(fieldName: string, arr: string[], msgData: any): any {
    return (value): any =>
      this.customAssert(value[fieldName], arr, msgData, value)
  }
}
