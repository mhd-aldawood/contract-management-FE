// src/data/repositories/AgreementRepositoryImpl.js
import EducationalContentRepository from '@/domain/repositories/EducationalContentRepository'
import EducationalContent from '@/domain/entities/EducationalContent'
import { createLogger } from '@/core/logger'

const log = createLogger('EducationalContentImpl')

export default class EducationalContentImpl extends EducationalContentRepository {
  constructor({ localDataSource }) {
    super()
    this.local = localDataSource
  }

  async getAll() {
    const list = await this.local.getAll()
    return list.map((raw) => EducationalContent.fromJSON(raw))
  }

  async getByType(type) {
    const list = await this.local.getByType(type)
    return list.map((raw) => EducationalContent.fromJSON(raw))
  }

  async save(agreement) {
    log.debug('save', agreement)
    const saved = await this.local.save(agreement)
    return EducationalContent.fromJSON(saved)
  }

  async remove(id) {
    return await this.local.remove(id)
  }
}