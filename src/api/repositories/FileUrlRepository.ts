import {EntityRepository, Repository} from 'typeorm'
import {FileUrl} from '@models/FileUrl'

@EntityRepository(FileUrl)
export class FileUrlRepository extends Repository<FileUrl> {}
