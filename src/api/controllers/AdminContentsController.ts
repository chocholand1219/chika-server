import {Body, JsonController, Get, Post, QueryParam} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {CreateContents} from '@src/api/controllers/requests/ContentsRequest'
import {ContentsService} from '@src/api/services/ContentsService'
import {TagType} from '@models/Tag'
import {Contents} from '@models/Contents'
import {IsNull} from 'typeorm'

@JsonController('/admin/content')
@OpenAPI({security: [{basicAuth: []}]})
export class AdminContentsController {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private contentsService: ContentsService
  ) {}

  @Post('')
  async createContents(@Body() body: CreateContents): Promise<any> {
    this.log.info('controller: createContents')

    return await this.contentsService.create(body)
  }

  @Get('')
  async getContent(@QueryParam('id') id: string): Promise<Contents> {
    this.log.info('controller: getContent')

    return await this.contentsService.get({where: {id}})
  }

  @Get('s')
  async getContents(): Promise<any> {
    this.log.info('controller: getContents')

    return await this.contentsService.gets()
  }

  @Get('s/noTheme')
  async getContentsWithNoTheme(): Promise<any> {
    this.log.info('controller: getContents')

    return await this.contentsService.gets({
      where: {
        theme: IsNull(),
      },
    })
  }

  @Get('/tags')
  async getTags(@QueryParam('type') type: TagType): Promise<any> {
    this.log.info('controller: getTags')

    return await this.contentsService.getTags({where: {type}})
  }
}
