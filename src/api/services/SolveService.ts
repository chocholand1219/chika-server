import {Service} from 'typedi'
import {CurrentUser} from 'routing-controllers'
import {User} from '@models/User'
import {Logger, LoggerInterface} from '@src/decorators/Logger'

@Service()
export class SolveService {
  constructor(
    @CurrentUser() private currentUser: User,
    @Logger(__filename) private log: LoggerInterface
  ) {}
}
