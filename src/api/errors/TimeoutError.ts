import {MakeErrorClass} from 'fejl'
import moment from 'moment'
import {configs} from '../../lib/env'

export default class TimeoutError extends MakeErrorClass('time out', {
  statusCode: 200,
}) {
  static customAssert(
    checkValidate: any,
    time: Date,
    msgData: any,
    value: any = time
  ): any {
    if (checkValidate(time)) {
      throw new this('time out', msgData)
    }
    return value
  }

  static checkAuthTimeAssert(time: Date, msgData: any, value?: any): any {
    return this.customAssert(
      (t: string) =>
        moment().isAfter(moment(t).add(configs.AUTH_TIME, 'minute')),
      time,
      msgData,
      value
    )
  }

  static makeAuthTimeAssert(fieldName: string, msgData: any): any {
    return (value): any =>
      this.checkAuthTimeAssert(value[fieldName], msgData, value)
  }
}
