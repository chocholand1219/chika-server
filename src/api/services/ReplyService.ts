import {Service} from 'typedi'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {SolveRepository} from '../repositories/SolveRepository'
import {Reply} from '../models/Reply'
import {NotEqualError, NotFoundError} from '../errors'
import {User} from '@models/User'

@Service()
export class ReplyService {
  constructor(@OrmRepository() private SolveRepository: SolveRepository) {}

  async getSolve(options: any): Promise<Reply> {
    return await this.SolveRepository.findOne(options)
  }

  async getMySolve(options: any, currentUser: User): Promise<Reply> {
    return await this.getSolve({...options, relations: ['Question']})
      .then(NotFoundError.makeCustomAssert(903))
      .then(
        NotEqualError.makeFieldAssert(
          'Question.id',
          currentUser.Question.id,
          903
        )
      )
  }

  async create(data: any): Promise<Reply> {
    return this.SolveRepository.save(data)
  }

  async update(data: any): Promise<Reply | undefined> {
    if (this.SolveRepository.hasId(data)) {
      return this.SolveRepository.save(data)
    }

    return undefined
  }

  async remove(Solve_id: number): Promise<Reply | undefined> {
    const Solve = await this.SolveRepository.findOne({id: Solve_id})

    if (!Solve) {
      return undefined
    }

    return await this.SolveRepository.remove(Solve)
  }
}
