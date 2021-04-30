import {EntityRepository, Repository} from 'typeorm'
import {Contents} from '@models/Contents'

@EntityRepository(Contents)
export class ContentsRepository extends Repository<Contents> {}
