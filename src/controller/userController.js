const userRepository = new (require("../repository/userRepository"))([]);

const UserService = require('../services/userService');

exports.getUser = async(req,res) => {
  const users = await userRepository.findMany()
  res.json(users)
}

exports.createUser = async(req,res) => {
  try {
    const user = new UserService(userRepository, req.body)  
    const newUser = await user.save()
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateUser = async(req,res) => {
  try {
    const user = new UserService(userRepository, req.body)  
    await user.save()
    return res.json(req.body)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// exports.deleteUser = async(req,res) => {
//   try {
//     const user = new UserService(userRepository, req.body)  
//     await user.save()
//     res.json(req.body)
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }