import {EntityRepository, Repository} from 'typeorm'
import {UserLog} from '../models/UserLog'

@EntityRepository(UserLog)
export class UserLogRepository extends Repository<UserLog> {}
