import {EntityRepository, Repository} from 'typeorm'
import {Theme} from '@models/Theme'

@EntityRepository(Theme)
export class ThemeRepository extends Repository<Theme> {}
