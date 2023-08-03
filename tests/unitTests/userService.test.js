const { describe, it } = require("mocha");
const { expect, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised);

const UserService = require("../../src/services/userService");
const UserRepository = require("../../src/repository/userRepository");

const mocks = {
  VALID_USER: require("../mocks/user/valid-user.json"),
  NEW_USER: require("../mocks/user/new-user-valid-body.json"),
  INVALID_USER: require("../mocks/user/invalid-user-body.json"),
  UPDATE_USER: require("../mocks/user/update-user-valid-body.json"),
  USER_LIST: require("../mocks/user/user-list.json"),
  USER_WITH_REPETED_NAME: require("../mocks/user/repeted-user-name.json"),
  USER_WITH_REPETED_EMAIL: require("../mocks/user/repeted-user-email.json"),
  UNSAFE_PASSWORD: require("../mocks/user/user-with-unsafe-password.json"),
};

describe("#UserService Suite Test", () => {
  it("should throw an exception if email, full name or password attributes are not provided", async () => {
    const userWithInvalidBody = mocks.INVALID_USER;
    const userService = new UserService([], userWithInvalidBody);

    try {
      await userService.save();
      expect("error").to.be.throw()
    } catch (error) {
      expect(error.message).to.equal(
        "Name, Email, and Password are required"
      );
    }
  });

  it("should throw an exception when attempting to register a user with an existing email", async () => {
    const userRepository = new UserRepository(mocks.USER_LIST);
    const userWithRepeatedEmail = mocks.USER_WITH_REPETED_EMAIL;
  
    const userService = new UserService(userRepository, userWithRepeatedEmail);
  
    try {
      await userService.save();
      expect("error").to.be.throw()
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

  it("should't throw an exception when userRespository is Empty", async () => {
    const userRepository = new UserRepository([]);
    const firstUser = mocks.VALID_USER;
  
    const userService = new UserService(userRepository, firstUser);
  
    try {
      const user = await userService.save();
      expect(user).to.be.ok
    } catch (error) {
      expect(error).to.empty();
    }
  });

  it("should be throw error when try updated an not existing user", async () => {
    const userRepository = new UserRepository(mocks.USER_LIST);
    const newUser = mocks.NEW_USER;

    const userService = new UserService(userRepository, newUser);
      
    try {
      await userService.update();
      expect(userService).to.be(new Error(""))
    } catch (error) {
      expect(error.message).to.equal(`User with id "${newUser.id}" Not Found!!`);
    }
  });

  it("should't be throw error when try updated an existing user", async () => {
    const userRepository = new UserRepository(mocks.USER_LIST);
    const validUser = mocks.UPDATE_USER;

    const userService = new UserService(userRepository, validUser);
      
    try {
      const updatedUser = await userService.update();
      expect(updatedUser).to.deep.equal({
        id: 'eda4b2f6-993c-46db-9ac9-0ef052874473',
        name: 'Miguel Antonio',
        email: 'miguel.antonio@gmail.com'
      })
    } catch (error) {
      expect(error.message).to.equal("");
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
    const userRepository = new UserRepository(mocks.USER_LIST);
    const userService = new UserService(userRepository, mocks.VALID_USER);

    expect(userService.isSafePassword()).be.true;

    try {
      await userService.save();
    } catch (error) {
      expect(await userService.save()).to.ok
    }
  });
});
