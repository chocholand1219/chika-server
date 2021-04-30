import {IsNotEmpty, IsString} from 'class-validator'

export class CreateAuth {
  @IsNotEmpty()
  @IsString()
  phone: string

  getRefinePhone(): string {
    return this.phone.replace(/[^0-9\.]+/g, '')
  }
}

export class CheckAuth extends CreateAuth {
  @IsNotEmpty()
  @IsString()
  code: string
}
