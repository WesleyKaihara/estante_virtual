class UserRepository {
    constructor({ data }) {
        this.data = data
    }

    async find(itemId) {
        const content = JSON.parse(await readFile(this.file))
        if(!itemId) return content

        return content.find(({ id }) => id === itemId)
    }
}

module.exports = UserRepository
