import {EntityRepository, Repository} from 'typeorm'
import {Question} from '../models/Question'

@EntityRepository(Question)
export class ReplyRepository extends Repository<Question> {}
