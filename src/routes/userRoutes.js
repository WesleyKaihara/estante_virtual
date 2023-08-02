const express =  require("express")
const router = express.Router()

router.get("/users", (req,res) => {
  res.json({ message: "GET User"})
})

router.post("/user", (req,res) => {
  res.json(req.body)
})

module.exports = router