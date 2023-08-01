const { describe, it } = require("mocha");
const { expect, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised);

const UserService = require("../../src/services/userService");
const UserRepository = require("../../src/repository/userRepository");

const mocks = {
  VALID_USER: require("../mocks/user/valid-user.json"),
  INVALID_USER: require("../mocks/user/invalid-user-body.json"),
  USER_LIST: require("../mocks/user/user-list.json"),
  USER_WITH_REPETED_NAME: require("../mocks/user/repeted-user-name.json"),
  USER_WITH_REPETED_EMAIL: require("../mocks/user/repeted-user-email.json"),
  UNSAFE_PASSWORD: require("../mocks/user/user-with-unsafe-password.json"),
};

describe("UserService Suite Test", () => {
  it("should throw an exception if email, full name or password attributes are not provided", async () => {
    const userWithInvalidBody = mocks.INVALID_USER;
    const createUserServiceWithInvalidBody = () =>
      new UserService([], userWithInvalidBody);

    expect(createUserServiceWithInvalidBody).to.throw(
      "Name, Email, and Password are required"
    );
  });

  it("should throw an exception when attempting to register a user with an existing email", async () => {
    const userRepository = new UserRepository(mocks.USER_LIST);
    const userWithRepeatedEmail = mocks.USER_WITH_REPETED_EMAIL;
  
    const userService = new UserService(userRepository, userWithRepeatedEmail);
  
    try {
      await userService.save();
    } catch (error) {
      expect(error.message).to.equal(
        `Email "${userWithRepeatedEmail.email}" is not avaible`
      );
    }
  });

  it("should throw an exception when attempting to register a user with an existing name", async () => {
    const userRepository = new UserRepository(mocks.USER_LIST);
    const userWithRepetedName = mocks.USER_WITH_REPETED_NAME;

    const userService = new UserService(userRepository, userWithRepetedName);
      
    try {
      await userService.save();
    } catch (error) {
      expect(error.message).to.equal(
        `Name "${userWithRepetedName.name}" is not avaible`
      );
    }
  });

  it("should throw an exception when password is not strong enough", async () => {
    const userUnsafePassword = mocks.UNSAFE_PASSWORD;
  
    const userService = new UserService([], userUnsafePassword);

    expect(userService.isSafePassword()).not.be.true;

    try {
      await userService.save();
    } catch (error) {
      expect(error.message).to.equal(
        `Password is not strong enough`
      );
    }
  });

  it("should not throw an exception when password is safe", async() => {
    const userRepository = new UserRepository([]);
    const userService = new UserService(userRepository, mocks.VALID_USER);

    expect(userService.isSafePassword()).be.true;

    try {
      await userService.save();
    } catch (error) {
      console.log("error",error);
    }

  });
});
