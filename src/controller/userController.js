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
    const user = new UserService(userRepository, {
      id: req.params.id,
      ...req.body
    })
    const updatedUser = await user.update()
    return res.json(updatedUser)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

exports.deleteUser = async(req,res) => {
  try {
    const user = new UserService(userRepository, { id: req.params.id })  
    await user.delete()
    res.json({ message: `User with id ${req.params.id} deleted!!`})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}