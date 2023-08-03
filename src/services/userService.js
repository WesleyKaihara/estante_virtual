class UserService {
  constructor(userRepository, { id, name, email, password } ) {
    this.userRepository = userRepository
    this.id = id || null
    this.name = name
    this.email = email
    this.password = password
  }

  isSafePassword() {
    const STRONG_PASS_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    
    return STRONG_PASS_REGEX.test(this.password)
  }

  async avaibleEmail() {
    if(this.userRepository.data.length > 0) {
      const userExists = await this.userRepository.find(this.email,"email")
      return !userExists.email
    }
    return true
  }

  async avaibleName() {
    if(this.userRepository.data.length > 0) {
      const userExists = await this.userRepository.find(this.name,"name")
      return !userExists.name
    }
    return true
  }
  
  validateBody() {
    if (!this.name || !this.email || !this.password) {
      throw new Error("Name, Email, and Password are required");
    }
    return true
  }

  async save() {
    this.validateBody()
    if (!this.isSafePassword()) {
      throw new Error("Password is not strong enough");
    }
    
    const isAvaibleEmail = await this.avaibleEmail()
    if(!isAvaibleEmail) throw new Error(`Email "${this.email}" is not avaible`)

    const isAvaibleName = await this.avaibleName()
    if(!isAvaibleName) throw new Error(`Name "${this.name}" is not avaible`)

    const newUser = this.userRepository.save({
      name: this.name,
      email: this.email,
      password: this.password,
    });
    
    return newUser;
  }

  async update() {
    this.validateBody()
    const user = await this.userRepository.find(this.id, "id")

    if(!user.id) {
      throw new Error(`User with id "${this.id}" Not Found!!`)
    }

    const { password, ...updatedUser} = await this.userRepository.update(this.id, {
      name: this.name,
      email: user.email,
      password: this.password
    })

    return updatedUser
  }

  async delete() {
    const userExists = await this.userRepository.find(this.id, "id")

    if(!userExists.id) {
      throw new Error(`User with id "${this.id}" Not Found!!`)
    }

    this.userRepository.delete(this.id)
    return
  }
}

module.exports = UserService
