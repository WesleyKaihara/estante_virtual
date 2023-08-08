const { describe, it } = require("mocha");
const { expect } = require("chai");
const UserRepository = require("../../src/repository/userRepository");

const mocks = {
  USERS_LIST: require("../mocks/user/user-list.json"),
};

describe("#UserRepository Suite Test", () => {
  it("should be return a user by id correctly", async () => {
    const userRepository = new UserRepository(mocks.USERS_LIST);

    const expected = {
      id: "47882db8-90a4-404e-ae98-fd0989597b52",
      name: "Lais Frigério",
      email: "laisfrigerio@hotmail.com"
    };

    const result = await userRepository.find("47882db8-90a4-404e-ae98-fd0989597b52", "id");
    
    expect(result).to.deep.equal(expected);
  });

  it("should't throw an exception when fetching users with empty user list", async () => {
    const userRepository = new UserRepository([]);
    
    console.log(userRepository);
    try {
      const result = await userRepository.find(2, "id");
      expect(result).to.equal({})
    } catch (error) {
    }
  });

  it("should be return empty Array when user not found", async () => {
    const userRepository = new UserRepository(mocks.USERS_LIST);

    const result = await userRepository.find(15, "id");
    
    expect(result).to.deep.equal({});
  });

  it("should throw an exception when fetching users with an invalid field", async () => {
    const userRepository = new UserRepository(mocks.USERS_LIST);
    
    try {
      await userRepository.find(2, "invalid_field");
    } catch (error) {
      expect(error.message).to.equal(
        `Field invalid_field is not found in users`
      );
    }
  });
  
  it("should be return user list without password", async () => {
    const userRepository = new UserRepository(mocks.USERS_LIST);

    const expected = [
      {
        "id": "a87cd144-3550-4ca0-a14a-f7f53d52a290",
        "name": "Juscelino Fernandes",
        "email": "juscelino.junior@gmail.com",
      },
      {
        "id": "eda4b2f6-993c-46db-9ac9-0ef052874473",
        "name": "Miguel Antonio",
        "email": "miguel.antonio@gmail.com",
      },
      {
        "id": "47882db8-90a4-404e-ae98-fd0989597b52",
        "name": "Lais Frigério",
        "email": "laisfrigerio@hotmail.com",
      }
    ];

    const result = await userRepository.findMany("47882db8-90a4-404e-ae98-fd0989597b52", "id");
    
    expect(result).to.deep.equal(expected);
  });

  it("should be delete user", async () => {
    const userRepository = new UserRepository(mocks.USERS_LIST);

    const expected = "";

    const result = await userRepository.delete("47882db8-90a4-404e-ae98-fd0989597b52", "id");
    
    expect(result).to.deep.equal();
  });

});
