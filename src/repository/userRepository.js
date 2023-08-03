class UserRepository {
  constructor(data) {
    this.data = data;
  }

  save(userData) {
    this.data.push(userData)
    const { password, ...user } = userData
    return user;
  }

  async find(value, field) {
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
    return this.data.find((user, idx) => {
      if (user.id === id) {
        this.data[idx] = { id, ...newData }
        return this.data[idx]
      }
    });
  }
}

module.exports = UserRepository;
