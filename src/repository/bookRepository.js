const uuid = require("uuid")
class BookRepository {
  constructor(data) {
    this.data = data
  }  

  async find(value, field) {
    if(this.data.length === 0) return {}
    
    return await this.data.find((book) => book[field] === value )
  }

  async save(bookData) {
    this.data.push(bookData)
    return bookData
  }

  async filter(value, field) {
    return await this.data.filter((book) => book[field] === value )
  }

  async findMany() {
    const data = await this.data.map(book => {
      return book
    })
    return data;
  }

  async update(id, newData) {
    await this.data.find((book, idx) => {
      if (book.id === id) {
        this.data[idx] = { id, ...newData }
        return this.data[idx]
      }
    });
    return { id, ...newData }
  }

  delete(id) {
    this.data.find((book, idx) => {
      if (book.id === id) {
        this.data.splice(idx, 1)
      }
    });
  }

}

module.exports = BookRepository
