const { describe, it } = require("mocha")
const { expect, use } = require("chai")
const chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised)

const UserService = require('../../src/services/userService')
const UserRepository = require('../../src/repository/userRepository')

const mocks = {
  VALID_USER: require("../mocks/user/valid-user.json"),
  USER_LIST: require("../mocks/user/user-list.json"),
  USER_WITH_REPETED_NAME: require("../mocks/user/repeted-user-name.json"),
  USER_WITH_REPETED_EMAIL: require("../mocks/user/repeted-user-email.json"),
  UNSAFE_PASSWORD: require("../mocks/user/user-with-unsafe-password.json"),
}

describe("Users Suite Test",() => {
  it("should receive email, Full name and password Information")

  it("should't allow the registration of two users with the same email", async() => {
    const userRepository = new UserRepository(mocks.USER_LIST)
    const userWithRepetedEmail = mocks.USER_WITH_REPETED_EMAIL
    
    const userService = new UserService(userRepository, userWithRepetedEmail);

    const result = async() => await userService.save()

    await expect(result())
      .to
      .be
      .rejectedWith(`Email "${userWithRepetedEmail.email}" is not avaible`)
  })

  it("should't allow the registration of two users with the same full name", async() => {
    const userRepository = new UserRepository(mocks.USER_LIST)
    const userWithRepetedName = mocks.USER_WITH_REPETED_NAME
    
    const userService = new UserService(userRepository, userWithRepetedName)
    const result = async() => await userService.save()

    await expect(result())
      .to
      .be
      .rejectedWith(`Name "${userWithRepetedName.name}" is not avaible`)
  })

  it("should be return false when password is unsafe", () => {
    const userService = new UserService([], mocks.UNSAFE_PASSWORD);
    expect(userService.isSafePassword()).not.be.true;
  })

  it("should be return true when password is safe", () => {
    const userService = new UserService([], mocks.VALID_USER);
    expect(userService.isSafePassword()).be.true;
  })
})