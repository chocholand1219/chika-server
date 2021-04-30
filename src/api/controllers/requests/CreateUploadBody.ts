import {IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {JSONSchema} from 'class-validator-jsonschema'

export class CreateUploadBody {
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    format: 'binary',
    type: 'string',
  })
  file: string

  @IsOptional()
  user_id: number
}
