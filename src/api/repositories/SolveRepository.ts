import {EntityRepository, Repository} from 'typeorm'
import {Bookmark} from '../models/Bookmark'

@EntityRepository(Bookmark)
export class SolveRepository extends Repository<Bookmark> {
  findByQuestionId(QuestionId: number): Promise<Bookmark[] | undefined> {
    const bookmark = new Bookmark()
    bookmark.id = QuestionId
    return this.find({where: {bookmark}})
  }
}
