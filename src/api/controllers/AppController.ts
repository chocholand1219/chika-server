import {
  Authorized,
  JsonController,
  Post,
  CurrentUser,
  Req,
  UploadedFile,
} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {User} from '@models/User'
import {CreateUploadBody} from '@src/api/controllers/requests/CreateUploadBody'
import {MultipartSchema} from '@src/decorators/schema/MultipartSchema'
import fileUploadOptions from '@src/api/middlewares/UploadMiddleware'
import {FileUrlService} from '@src/api/services/FileUrlService'
import {FileUrl} from '@models/FileUrl'

@Authorized()
@JsonController('/app')
@OpenAPI({security: [{basicAuth: []}]})
export class AppController {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private fileUrlService: FileUrlService
  ) {}

  @Post('/file/upload')
  @MultipartSchema(CreateUploadBody)
  async uploadFile(
    @Req() req: any,
    @CurrentUser() user: User,
    @UploadedFile('file', {options: fileUploadOptions()}) file: any
  ): Promise<any> {
    this.log.info('uploadFile', file)
    const fileUrl = new FileUrl()
    fileUrl.name = file.originalname
    fileUrl.url = file.location
    return await this.fileUrlService.create(fileUrl)
  }
}
