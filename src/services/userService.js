class UserService {
  constructor(userRepository, { name, email, password } ) {
    this.userRepository = userRepository
    this.name = name
    this.email = email
    this.password = password
    this.validateBody()
  }

  isSafePassword() {
    const STRONG_PASS_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    
    return STRONG_PASS_REGEX.test(this.password)
  }

  async avaibleEmail() {
    if(this.userRepository.data.length > 0) {
      const userExists = await this.userRepository.find(this.email,"email")
      return !userExists.id
    }
    return true
  }

  async avaibleName() {
    if(this.userRepository.data.length > 0) {
      const userExists = await this.userRepository.find(this.name,"name")
      return !userExists.id
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
    const isAvaibleEmail = await this.avaibleEmail()

    if(isAvaibleEmail) {
      throw new Error(`User not Found!!`)
    }

    const { id, ...data } = await this.userRepository.find(this.email, "email")

    const updatedUser = await this.userRepository.update(id,data);

    return updatedUser
  }

}

module.exports = UserService
