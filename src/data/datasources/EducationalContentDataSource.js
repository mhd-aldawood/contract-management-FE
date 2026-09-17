const STORAGE_KEY = 'app_educational_contents'

export default class EducationalContentDataSoruce {
  _readAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  _writeAll(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  async getAll() {
    return this._readAll()
  }

  async getByType(type) {
    return this._readAll().filter((a) => a.type === type)
  }

  async save(agreement) {
    const list = this._readAll()
    const plain = typeof agreement.toJSON === 'function'
      ? agreement.toJSON()
      : { ...agreement }

    if (!plain.id) {
      plain.id = Date.now().toString()
      list.push(plain)
    } else {
      const idx = list.findIndex((a) => a.id === plain.id)
      if (idx >= 0) list[idx] = plain
      else list.push(plain)
    }

    this._writeAll(list)
    return plain
  }

  async remove(id) {
    const list = this._readAll().filter((a) => a.id !== id)
    this._writeAll(list)
    return true
  }
}