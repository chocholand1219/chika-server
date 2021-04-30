import {Authorized, JsonController, Get, Body} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {getRepository} from 'typeorm'
import {Theme} from '@models/Theme'
import {ContentsStatusType} from '@models/Contents'

@Authorized()
@JsonController('/theme')
@OpenAPI({security: [{basicAuth: []}]})
export class ThemeController {
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  @Get('s')
  async getThemes(@Body() body: any): Promise<any> {
    this.log.info('/get themes', body)

    return await getRepository(Theme)
      .createQueryBuilder('themes')
      .leftJoinAndSelect('themes.contents', 'contents')
      .leftJoinAndSelect('contents.classifications', 'classifications')
      .leftJoinAndSelect('contents.keywords', 'keywords')
      .where('contents.status = :status', {
        status: ContentsStatusType.활성상태,
      })
      .orderBy('themes.order', 'ASC')
      .addOrderBy('contents.order', 'ASC')
      .getMany()
  }
}
