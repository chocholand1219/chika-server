import {JsonController, Get, Post, Put, Body} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'
import {getRepository} from 'typeorm'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {ThemeService} from '@src/api/services/ThemeService'
import {Theme} from '@models/Theme'
import {UpdateThemeRequest} from '@src/api/controllers/requests/ThemeRequest'

@JsonController('/admin/theme')
@OpenAPI({security: [{basicAuth: []}]})
export class AdminUserController {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private themeService: ThemeService
  ) {}

  @Get('s')
  async getThemes(@Body() body: any): Promise<any> {
    this.log.info('/get themes', body)

    return await getRepository(Theme)
      .createQueryBuilder('themes')
      .leftJoinAndSelect('themes.contents', 'contents')
      .orderBy('themes.order', 'ASC')
      .addOrderBy('contents.order', 'ASC')
      .getMany()
  }

  @Post()
  async createTheme(@Body() body: Theme): Promise<any> {
    const theme = new Theme()
    theme.name = body.name
    return await this.themeService.create(body)
  }

  @Put('s')
  async updateThemes(@Body() body: UpdateThemeRequest): Promise<any> {
    return await this.themeService.updateBulk(body.themes)
  }
}
