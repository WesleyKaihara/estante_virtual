const express =  require("express");
const router = express.Router()
const bookController = require("../controller/bookController");

router.get("/books", bookController.getBooks)
router.post("/book", bookController.createBook)
router.put("/book/:id", bookController.updateBook)
router.delete("/book/:id", bookController.deleteBook)

module.exports = router