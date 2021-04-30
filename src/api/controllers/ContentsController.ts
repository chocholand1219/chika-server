import {Get, JsonController, QueryParam} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'
import axios from 'axios'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {ContentsService} from '@src/api/services/ContentsService'
import {Tag, TagType} from '@models/Tag'
import {getRepository} from 'typeorm'

@JsonController('/content')
@OpenAPI({security: [{basicAuth: []}]})
export class ContentsController {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private contentsService: ContentsService
  ) {}

  @Get('')
  async getContent(@QueryParam('contentId') contentId: string): Promise<any> {
    this.log.info('controller: getContent', contentId)

    return await this.contentsService.get({where: {id: contentId}})
  }

  @Get('/question')
  async getQuestion(
    @QueryParam('questionId') questionId: string
  ): Promise<any> {
    this.log.info('controller: getQuestion')
    const question = await this.contentsService.getQuestion({
      where: {id: questionId},
    })

    const {data: file_text} = await axios.get(question.file.url, {
      responseType: 'text',
    })
    return {...question, file_text}
  }

  @Get('/tags')
  async getTags(
    @QueryParam('type') type: TagType,
    @QueryParam('cTags') cTags: string[]
  ): Promise<any> {
    this.log.info(`controller: getTags ${type}, ${cTags}`)

    return getRepository(Tag)
      .createQueryBuilder('tag')
      .innerJoin('tag.keywordsContents', 'contents')
      .innerJoin(
        'contents.classifications',
        'classifications',
        'classifications.name IN (:cTags)',
        {cTags}
      )
      .getMany()
  }
}
