const {DatabaseService} = require('../serviceLayer2/databaseService');


class UserDataService {
    verifyUser = async () => {
        if (!login) throw new Error("Login data is required.")
        let user = await DatabaseService.getDocumentByUsername(login.username);
        if (!user) throw new Error('We could not find an account by this user name.');

        let isValid = await bcrypt.compare(login.password, user.hash);
        if (!isValid) throw new Error("Invalid password.");

        user = await this.filterUserForPublic(user);
        user.token = this.createToken(user.username);

        return { user }
    }
}

module.exports = { UserDataService: new UserDataService() }

