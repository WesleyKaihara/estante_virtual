class BookService  {
  constructor({ title, status, startDateReading , endDateReading }) {
    this.title = title
    this.status = status
    this.startDateReading = startDateReading
    this.endDateReading = endDateReading
  }

}

module.exports = BookService