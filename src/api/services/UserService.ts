import {Service} from 'typedi'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {plainToClass} from 'class-transformer'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {User} from '@models/User'
import {UserRepository} from '../repositories/UserRepository'
import {Nickname} from '@models/Nickname'
import {NicknameRepository} from '@src/api/repositories/NicknameRepository'

@Service()
export class UserService {
  constructor(
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private nicknameRepository: NicknameRepository,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  find(query: any): Promise<User[] | undefined> {
    this.log.info('Find all users')
    return this.userRepository.find(query)
  }

  findOne(options: any = {}): Promise<User> {
    this.log.info('Find user', options)
    return this.userRepository.findOne(options)
  }

  async create(user: User): Promise<User> {
    this.log.info('Create a new user => ', user)
    return await this.userRepository.save(plainToClass(User, user))
  }

  async update(user: User): Promise<User> {
    this.log.info('Update a user => ', user)
    return await this.userRepository.save(user)
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    this.log.info('Find one user by email')
    return this.findOne({
      where: {email},
    })
  }

  getNicknames(): Promise<Nickname[]> {
    return this.nicknameRepository.findWithRandom()
  }
}
