import * as express from 'express'
import {Service} from 'typedi'
import {Logger, LoggerInterface} from '../decorators/Logger'
import {env} from '../env'
import {getDecodedToken} from './token'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {AuthRepository} from '@src/api/repositories/AuthRepository'
import {Auth} from '@models/Auth'
import {EntityManager, Transaction, TransactionManager} from 'typeorm'
import {SMSService} from '@src/api/services/SMSService'
import {CheckAuth} from '@src/api/controllers/requests/AuthRequest'

@Service()
export class AuthService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    @OrmRepository() private authRepository: AuthRepository,
    private smsService: SMSService
  ) {}

  parseBasicAuthFromRequest(
    req: express.Request
  ): {username: string; password: string} {
    const authorization = req.header('authorization')
    if (authorization && authorization.split(' ')[0] === 'Basic') {
      this.log.info('Credentials provided by the client')
      const decodedBase64 = Buffer.from(
        authorization.split(' ')[1],
        'base64'
      ).toString('ascii')
      const username = decodedBase64.split(':')[0]
      const password = decodedBase64.split(':')[1]
      if (username && password) {
        return {username, password}
      }
    }

    this.log.info('No credentials provided by the client')
    return undefined
  }

  parseFromRequest(req: express.Request & {token: string}): {email: any} {
    const {email} =
      (env.isProduction
        ? getDecodedToken(req.token)
        : this.parseBasicAuthFromRequest(req)) || {}

    return {
      email,
    }
  }

  @Transaction()
  async create(
    auth: Auth,
    @TransactionManager() manager?: EntityManager
  ): Promise<Auth> {
    await manager.save(auth)
    return await this.smsService.send(
      auth.phone,
      `[퓨쳐스킬] 인증번호 [${auth.code}]. 인증번호 유효시간은 3분입니다.`
    )
  }

  findOne(auth: CheckAuth): Promise<Auth> {
    console.log('auth', auth)
    return this.authRepository.findOne(auth)
  }
}
