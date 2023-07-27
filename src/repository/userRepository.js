class UserRepository {
    constructor(data) {
        this.data = data
    }

    async find(value, field) {
        return this.data.find((user) => user[field] === value )
    }
}

module.exports = UserRepository
