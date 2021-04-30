import {Service} from 'typedi'
import {OrmRepository} from 'typeorm-typedi-extensions'
import {FileUrlRepository} from '@src/api/repositories/FileUrlRepository'
import {FileUrl} from '@models/FileUrl'

@Service()
export class FileUrlService {
  constructor(@OrmRepository() private fileUrlRepository: FileUrlRepository) {}

  async create(data: any): Promise<FileUrl> {
    return this.fileUrlRepository.save(data)
  }

  async remove(fileUrl_id: number): Promise<FileUrl | undefined> {
    const fileUrl = await this.fileUrlRepository.findOne({id: fileUrl_id})

    if (!fileUrl) {
      return undefined
    }

    return await this.fileUrlRepository.remove(fileUrl)
  }
}
