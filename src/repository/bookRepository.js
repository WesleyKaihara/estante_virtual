class BookRepository {
  constructor(data) {
    this.data = data
  }  

  async find(value, field) {
    return await this.data.find((book) => book[field] === value )
  }

  async filter(value, field) {
    return await this.data.filter((book) => book[field] === value )
  }
}

module.exports = BookRepository
