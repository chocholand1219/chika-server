import {ValidateNested} from 'class-validator'
import {Contents} from '@models/Contents'
import {Question} from '@models/Question'
import {Type} from 'class-transformer'
import {Tag} from '@models/Tag'

export class CreateContents extends Contents {
  @ValidateNested({each: true})
  @Type(() => Tag)
  classificationTag: Tag[]

  @ValidateNested({each: true})
  @Type(() => Tag)
  keywordTag: Tag[]

  @ValidateNested({each: true})
  @Type(() => Question)
  questions: Question[]
}
