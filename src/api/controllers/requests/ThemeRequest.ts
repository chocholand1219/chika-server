import {ValidateNested} from 'class-validator'
import {Theme} from '@models/Theme'
import {Type} from 'class-transformer'

export class UpdateThemeRequest {
  @ValidateNested({each: true})
  @Type(() => Theme)
  themes: Theme[]
}
