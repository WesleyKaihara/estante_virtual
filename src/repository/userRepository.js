class UserRepository {
    constructor(data) {
        this.data = data
    }

    async find(value, field) {
        if(!this.data[0][field]) {
            throw new Error(`Field ${field} is not found in users`)
        }
        const user = this.data.find((user) => user[field] === value )
        delete user?.password
        return user || {}
    }
}

module.exports = UserRepository
