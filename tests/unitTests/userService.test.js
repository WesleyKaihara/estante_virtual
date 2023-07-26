const { describe, it } = require("mocha")
const { expect, use } = require("chai")
const UserService = require('../../src/services/userService')

const mocks = {
  VALID_USER: require("../mocks/user/valid-user.json"),
  USER_LIST: require("../mocks/user/user-list.json"),
  REPETED_USER_NAME: require("../mocks/user/repeted-user-name.json"),
  REPETED_USER_EMAIL: require("../mocks/user/repeted-user-email.json"),
  UNSAFE_PASSWORD: require("../mocks/user/user-with-unsafe-password.json"),
}

describe("Users Suite Test",() => {
  it("should receive email, Full name and password Information")
  it("should't allow the registration of two users with the same email", () => {
    const userService = new UserService([], mocks.UNSAFE_PASSWORD);
    expect(userService.isSafePassword()).not.be.true;
  })
  it("should't allow the registration of two users with the same full name")

  it("should be return false when password is unsafe", () => {
    const userService = new UserService([], mocks.UNSAFE_PASSWORD);
    expect(userService.isSafePassword()).not.be.true;
  })

  it("should be return true when password is safe", () => {
    const userService = new UserService([], mocks.VALID_USER);
    expect(userService.isSafePassword()).be.true;
  })
})