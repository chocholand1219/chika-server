import {EntityRepository, Repository} from 'typeorm'
import {Nickname} from '@models/Nickname'

@EntityRepository(Nickname)
export class NicknameRepository extends Repository<Nickname> {
  findWithRandom = () => {
    return this.createQueryBuilder().orderBy('RAND()').limit(10).getMany()
  }
}
