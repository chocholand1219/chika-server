import {Service} from 'typedi'
import {FindManyOptions} from 'typeorm'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {ThemeRepository} from '../repositories/ThemeRepository'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {Theme} from '@models/Theme'
import {ContentsRepository} from '@src/api/repositories/ContentsRepository'

@Service()
export class ThemeService {
  constructor(
    @OrmRepository() private themeRepository: ThemeRepository,
    @OrmRepository() private contentsRepository: ContentsRepository,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  async getThemes(options?: FindManyOptions<any>): Promise<Theme[]> {
    return await this.themeRepository.find(options)
  }

  async create(data: Theme): Promise<Theme> {
    return await this.themeRepository.save(data)
  }

  async count(options?: any): Promise<number> {
    return await this.themeRepository.count(options)
  }

  async update(data: any): Promise<any | undefined> {
    this.log.info('update Report')
    if (this.themeRepository.hasId(data)) {
      return await this.themeRepository.save(data)
    }

    return undefined
  }

  async updateBulk(themes: Theme[]): Promise<Theme[]> {
    const contents = []
    themes = themes.map((bodyTheme, themeIdx) => {
      const theme = new Theme()
      theme.id = bodyTheme.id
      theme.name = bodyTheme.name
      theme.order = themeIdx + 1
      bodyTheme.contents.map((content, contentIdx) => {
        content.theme = new Theme()
        content.theme.id = bodyTheme.id
        content.order = contentIdx + 1
        contents.push(content)
      })
      return theme
    })

    await this.contentsRepository.save(contents)
    return await this.themeRepository.save(themes)
  }
}
