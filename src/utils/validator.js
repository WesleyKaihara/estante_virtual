class Validator {
  constructor(value) {
    this.value = value
    this.isValid = true
  }

  exec() {
    return this.isValid;
  }
}
