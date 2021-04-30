import {JsonController, Post, Body} from 'routing-controllers'
import _ from 'lodash'
import {OpenAPI} from 'routing-controllers-openapi'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {FindOperator, In} from 'typeorm'

@JsonController('/admin/user')
@OpenAPI({security: [{basicAuth: []}]})
export class AdminUserController {
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  @Post('/get_deleted_member')
  async getDeletedMember(@Body() body: any): Promise<any> {
    this.log.info('/get_deleted_member', body)
    const {payment_status, province, approve_status, user_type} = body

    const where: {user_type: FindOperator<any>} & {
      created_at_finish?: string
      created_at_start?: string
      login_start_time?: string
      login_finish_time?: string
      payment_status?: string
      province?: string
      approve_status?: string
      view_right?: string
    } = {..._.pickBy(body, _.identity)}

    if (Array.isArray(user_type)) {
      where.user_type = In(user_type)
    }

    if (approve_status) {
      delete where.approve_status
    }

    if (payment_status) {
      delete where.payment_status
    }

    if (province) {
      delete where.province
    }

    return {}
  }
}
