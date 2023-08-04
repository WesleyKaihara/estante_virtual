const bookRepository = new (require("../repository/bookRepository"))([]);

const BookService = require('../services/bookService');

exports.getBooks = async(req,res) => {
  const books = await bookRepository.findMany()
  res.json(books)
}

exports.createBook = async(req,res) => {
  try {
    const book = new BookService(bookRepository, req.body)
    const newBook = await book.save()
    res.json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateBook = async(req,res) => {
  try {
    const book = new BookService(bookRepository, {
      id: req.params.id,
      ...req.body
    })
    const updatedBook = await book.update()
    return res.json(updatedBook)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

exports.deleteBook = async(req,res) => {
  try {
    const book = new BookService(bookRepository, { id: req.params.id })  
    await book.delete()
    res.json({ message: `Book with id ${req.params.id} deleted!!`})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}