const express =  require("express");
const router = express.Router()
const userController = require("../controller/userController");

router.get("/users", userController.getUser)
router.post("/user", userController.createUser)

module.exports = router