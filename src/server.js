const express = require("express")
const userRoutes = require("./routes/userRoutes")

const createServer = (port) => {
  const app = express()

  app.use(express.json())
  app.use(userRoutes)

  app.get("/", (req,res) =>  {
    res.json({message: "Hello World"})
  })

  return app.listen(port)

}

module.exports = createServer
