const userRepository = new (require("../repository/userRepository"))([]);

const UserService = require('../services/userService');

exports.getUser = (req,res) => {
  res.json({ message: "GET User"})
}

exports.createUser = async(req,res) => {
  try {
    const user = new UserService(userRepository, req.body)  
    await user.save()
    res.json(req.body)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// exports.updateUser = async(req,res) => {
//   try {
//     const user = new UserService(userRepository, req.body)  
//     await user.save()
//     res.json(req.body)
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }

// exports.deleteUser = async(req,res) => {
//   try {
//     const user = new UserService(userRepository, req.body)  
//     await user.save()
//     res.json(req.body)
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }