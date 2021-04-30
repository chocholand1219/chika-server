import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParams,
  QueryParam,
  Res,
} from 'routing-controllers'
import jwt from 'jsonwebtoken'
import {OpenAPI} from 'routing-controllers-openapi'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {getRandomNumber} from '@src/utils/number'
import {AuthService} from '@src/auth/AuthService'
import {Auth} from '@models/Auth'
import {NotFoundError, TimeoutError} from '@src/api/errors'
import {CheckAuth, CreateAuth} from '@src/api/controllers/requests/AuthRequest'
import {UserService} from '@src/api/services/UserService'
import {env} from '@src/env'

const ACCESS_TOKEN_EXPIRES = 24 * 60 * 60 * 1000

@JsonController('/auth')
@OpenAPI({security: [{basicAuth: []}]})
export class AuthController {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/code')
  async createCode(@Body() authBody: CreateAuth): Promise<any> {
    this.log.info('controller: Create auth code')
    const auth = new Auth()
    auth.code = String(getRandomNumber())
    auth.phone = authBody.getRefinePhone()

    await this.authService.create(auth)
    return true
  }

  @Get('/checkCode')
  async checkCode(@QueryParams() query: CheckAuth): Promise<boolean> {
    query.phone = query.getRefinePhone()
    return await this.authService
      .findOne(query)
      .then(NotFoundError.makeCustomAssert('일치하는 정보가 없습니다.'))
      .then(
        TimeoutError.makeAuthTimeAssert('create_at', '시간이 초과되었습니다.')
      )
  }

  @Get()
  async login(
    @QueryParam('google_id', {required: true}) google_id: string,
    @Res() res: any
  ): Promise<any> {
    const user = await this.userService
      .findOne({
        where: {
          google_id,
        },
      })
      .then(NotFoundError.makeCustomAssert('존재하지 않는 사용자입니다.'))

    const accessToken = await jwt.sign(
      {
        id: user.id,
      },
      env.ACCESS_PRIVATE_KEY,
      {expiresIn: ACCESS_TOKEN_EXPIRES}
    )

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXPIRES,
    })

    return user
  }
}
