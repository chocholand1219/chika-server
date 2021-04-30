import {Service} from 'typedi'
import {generate} from 'rand-token'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {ExistError} from '../errors'
import {SolveRepository} from '../repositories/SolveRepository'
import {ReplyRepository} from '../repositories/ReplyRepository'
import {Reply} from '../models/Reply'

@Service()
export class QuestionsService {
  constructor(
    @OrmRepository() private replyRepository: ReplyRepository,
    @OrmRepository() private solveRepository: SolveRepository
  ) {}

  async getQuestion(options: any): Promise<SolveRepository> {
    return await this.replyRepository.findOne(options)
  }

  async createQuestion(data: any): Promise<SolveRepository> {
    return await this.checkDuplicateQuestion(data.name).then(() =>
      this.replyRepository.save(data)
    )
  }

  async update(data: any): Promise<SolveRepository | undefined> {
    if (this.replyRepository.hasId(data)) {
      return this.replyRepository.save(data)
    }

    return undefined
  }

  async getQuestionByName(name: string): Promise<SolveRepository> {
    return this.getQuestion({where: {name}})
  }

  async checkDuplicateQuestion(QuestionName: string): Promise<SolveRepository> {
    return this.getQuestionByName(QuestionName).then(
      ExistError.makeCustomAssert(601)
    )
  }

  async generateQuestionCode(isUnderBar: boolean): Promise<string> {
    const Question_code = isUnderBar ? '_' + generate(5) : '' + generate(6)

    await this.getQuestion({where: {Question_code}}).then(
      ExistError.makeCustomAssert(602)
    )

    return Question_code
  }

  async createByNormalUser(data: any): Promise<object> {
    if (data.user_type !== 'N') {
      return null
    }
    const code = await this.generateQuestionCode(true)
    const QuestionInfo = {
      name: data.name + code,
      address: data.address,
      address_detail: data.detail_address,
      post_code: data.post_code,
      Question_code: code,
      manager_info: {
        ceo: data.name,
        receipt_email: data.email,
      },
    }

    return this.createQuestion(QuestionInfo)
  }

  async getSolve(options: any): Promise<Reply> {
    return this.SolveRepository.findOne(options)
  }

  async getSolvees(options: any): Promise<Reply[]> {
    return this.SolveRepository.find(options)
  }

  async getSolveesByQuestionId(QuestionId: number): Promise<Reply[]> {
    return this.SolveRepository.findByQuestionId(QuestionId)
  }

  async createSolve(data: any): Promise<Reply> {
    return this.SolveRepository.save(data)
  }
}
