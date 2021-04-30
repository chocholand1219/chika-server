import {BodyParam} from 'routing-controllers'

export const ReqBodyParam = (name, options = {}): any =>
  BodyParam(name, {required: true, ...options})
