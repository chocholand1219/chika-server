import {Service} from 'typedi'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {ContentsRepository} from '@src/api/repositories/ContentsRepository'
import {QuestionRepository} from '@src/api/repositories/QuestionsRepository'
import {Contents} from '@models/Contents'
import {TagRepository} from '@src/api/repositories/TagRepository'
import {Tag, TagType} from '@models/Tag'
import {Question} from '@models/Question'
import {FileUrl} from '@models/FileUrl'

@Service()
export class ContentsService {
  constructor(
    @OrmRepository() private contentsRepository: ContentsRepository,
    @OrmRepository() private questionRepository: QuestionRepository,
    @OrmRepository() private tagRepository: TagRepository
  ) {}

  async get(options: any): Promise<Contents> {
    return await this.contentsRepository.findOne({
      ...options,
      relations: [
        'questions',
        'questions.file',
        'classifications',
        'keywords',
        'theme',
      ],
    })
  }

  async gets(options?: any): Promise<Contents[]> {
    return await this.contentsRepository.find(options)
  }

  async getTags(options: any): Promise<Tag[]> {
    return await this.tagRepository.find(options)
  }

  async create(data: any): Promise<Contents> {
    let {questions} = data
    const {classificationTag, keywordTag} = data

    questions = questions.map((question) => {
      const q = new Question()
      q.id = question.id
      q.title = question.title
      q.submitType = question.submitType
      q.file = new FileUrl()
      q.file.id = question.file.id
      return q
    })
    const classifications = classificationTag.map((cTag) => {
      const tag = new Tag()
      tag.id = cTag.id
      tag.type = TagType.대분류
      tag.name = cTag.name
      return tag
    })
    const keywords = keywordTag.map((kTag) => {
      const tag = new Tag()
      tag.id = kTag.id
      tag.type = TagType.키워드
      tag.name = kTag.name
      return tag
    })

    await this.questionRepository.save(questions)
    await this.tagRepository.save(classifications)
    await this.tagRepository.save(keywords)
    const content = new Contents()
    content.id = data.id
    content.title = data.title
    content.level = data.level
    content.goal = data.goal
    content.link = data.link
    content.introduce = data.introduce
    content.status = data.status
    content.order = data.order
    content.questions = questions
    content.classifications = classifications
    content.keywords = keywords

    return this.contentsRepository.save(content)
  }

  async remove(contents_id: number): Promise<Contents | undefined> {
    const contents = await this.contentsRepository.findOne(contents_id)

    if (!contents) {
      return undefined
    }

    return await this.contentsRepository.remove(contents)
  }

  async getQuestion(options: any): Promise<Question> {
    return await this.questionRepository.findOne({
      ...options,
      relations: ['file', 'content', 'content.theme'],
    })
  }
}
