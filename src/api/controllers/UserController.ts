import {
  Body,
  Get,
  JsonController,
  Post,
  Put,
  QueryParam,
  Req,
} from 'routing-controllers'
import {OpenAPI} from 'routing-controllers-openapi'
import {Logger, LoggerInterface} from '@src/decorators/Logger'
import {UserService} from '../services/UserService'
import {User} from '@models/User'
import {Nickname} from '@models/Nickname'

@JsonController('/user')
@OpenAPI({security: [{basicAuth: []}]})
export class UserController {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private userService: UserService
  ) {}

  @Get()
  getUser(@Req() req: any): User {
    this.log.info('Find user')
    return req.user || {}
  }

  @Put()
  async updateUser(@Body() body: any): Promise<User> {
    this.log.info('controller: update user')
    const user = new User()
    user.id = body.id
    user.nickname = body.nickname
    return this.userService.update(user)
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    this.log.info('controller: Create user')
    return this.userService.create(user)
  }

  @Get('/checkEmail')
  async checkEmail(@QueryParam('email') email: string): Promise<boolean> {
    return !Boolean(await this.userService.findOneByEmail(email))
  }

  @Get('/nicknames')
  async getNicknames(): Promise<Nickname[]> {
    return this.userService.getNicknames()
  }
}
