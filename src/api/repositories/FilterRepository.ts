import {Like, Repository} from 'typeorm'
import {dateToWhereOption} from '../../utils/date'

export class FilterRepository<T> extends Repository<T> {
  findWithFilters(options: any = {}): Promise<[T[], number]> {
    let {where = {}} = options
    const {page, size, keyword_type, keyword} = where
    if (page) {
      options.skip = (page - 1) * size
      delete where.page
    }
    if (size) {
      options.take = size
      delete where.size
    }

    if (keyword && keyword_type) {
      where[keyword_type] = Like(`%${keyword}%`)
      delete where.keyword_type
      delete where.keyword
    }

    where = dateToWhereOption(where)
    return super.findAndCount({...options, where})
  }
}
