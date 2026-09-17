export default class SaveEducataionalContentUseCase {
  constructor({ educationalConetntRepository }) {
    this.educationalConetntRepository = educationalConetntRepository
  }

  async execute(agreement) {
    if (!agreement) throw new Error('Agreement is required')
    return await this.educationalConetntRepository.save(agreement)
  }
}