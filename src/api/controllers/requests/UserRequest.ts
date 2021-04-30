import {IsNotEmpty, IsString} from 'class-validator'
import {User} from '@models/User'

export class CreateUser extends User {
  @IsNotEmpty()
  @IsString()
  name: string
}
