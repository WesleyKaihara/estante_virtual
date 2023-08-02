const express = require("express")
const userRoutes = require("./routes/userRoutes")

const createServer = (port) => {
  const app = express()

  app.use(userRoutes)

  app.get("/", (req,res) =>  {
    res.json({message: "Hello World"})
  })

  return app.listen(port , () => {
    console.log(`Application running on port ${port}`)
  })

}

module.exports = createServer
