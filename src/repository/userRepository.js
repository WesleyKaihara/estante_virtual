const uuid = require("uuid")
class UserRepository {
  constructor(data) {
    this.data = data;
  }

  save(userData) {
    this.data.push({id: uuid.v4(), ...userData})
    const { password, ...user } = userData
    return user;
  }

  async find(value, field) {
    if(this.data.length === 0 ) return {}

    if (!this.data[0][field]) {
      throw new Error(`Field ${field} is not found in users`);
    }
    const user = this.data.find((user) => user[field] === value);
    delete user?.password;
    return user || {};
  }

  async findMany() {
    const data = await this.data.map(user => {
      const {password, ...userData } = user;
      return userData
    })
    return data;
  }

  async update(id, newData) {
    await this.data.find((user, idx) => {
      if (user.id === id) {
        this.data[idx] = { id, ...newData }
        return this.data[idx]
      }
    });
    return { id, ...newData }
  }

  delete(id) {
    this.data.find((user, idx) => {
      if (user.id === id) {
        this.data.splice(idx, 1)
      }
    });
  }
}

module.exports = UserRepository;
