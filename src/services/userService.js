class UserService {
  constructor(userRepository, { name, email, password } ) {
    name: Number
    this.userRepository = userRepository
    this.name = name
    this.email = email
    this.password = password
  }

  isSafePassword() {
    const STRONG_PASS_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    
    return STRONG_PASS_REGEX.test(this.password)
  }

  async avaibleEmail() {
    return await this.userRepository.find(this.email,"email")?false:true
  }

  avaibleName() {
    return this.userRepository.find(this.name,"name")?false:true
  }
  
  async save() {
    const isAvaibleEmail = await this.avaibleEmail()
    if(!isAvaibleEmail) throw new Error(`Email "${this.email}" is not avaible`)

    const isAvaibleName = this.avaibleName()
    if(!isAvaibleName) throw new Error(`Name "${this.name}" is not avaible`)

    return {
      name: this.name,
      email: this.email
    }
  }

}

module.exports = UserService
