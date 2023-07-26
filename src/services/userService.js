class UserService {
  constructor(userRepository, { name, email, password } ) {
    this.userRepository = userRepository
    this.name = name
    this.email = email
    this.password = password
  }

  isSafePassword() {
    const STRONG_PASS_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    
    return STRONG_PASS_REGEX.test(this.password)
  }

  save() {
    return {
      name: this.name,
      email: this.email
    }
  }


  avaibleName() {
    this.userRepository
  }

}

module.exports = UserService
