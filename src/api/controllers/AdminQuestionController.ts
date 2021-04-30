import {JsonController, Authorized} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'

@Authorized()
@JsonController('/admin/question')
@OpenAPI({security: [{basicAuth: []}]})
export class AdminQuestionController {
  constructor() {}
}
