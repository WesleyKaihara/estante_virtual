class UserService {
  constructor(userRepository, { name, email, password } ) {
    this.userRepository = userRepository
    this.name = name
    this.email = email
    this.password = password
    if (!this.validateBody()) {
      throw new Error("Email, Full name, and Password are required");
    }
  }

  isSafePassword() {
    const STRONG_PASS_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    
    return STRONG_PASS_REGEX.test(this.password)
  }

  async avaibleEmail() {
    return await this.userRepository.find(this.email,"email")?false:true
  }

  async avaibleName() {
    return await this.userRepository.find(this.name,"name")?false:true
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

    return {
      name: this.name,
      email: this.email
    }
  }

}

module.exports = UserService
