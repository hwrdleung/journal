const {User} = require('../schemas')

class DatabaseService {
    getDocumentByUsername = async (username) => await User.findOne({username: username});
}

module.exports = { DatabaseService: new DatabaseService() }