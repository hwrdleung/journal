const { DatabaseService } = require('../serviceLayer2/databaseService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserDataService {
  verifyToken = async (userData) => {
    if (!userData) throw new Error('Token is required for verification')

    let isVerfied = jwt.verify(userData.token, process.env.JWT_SECRET)
    if (!isVerfied) throw new Error('Invalid token.')

    let user = await DatabaseService.getDocumentByUsername(isVerified.username)
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET)

    return { user, token }
  }

  verifyUser = async (userData) => {
    if (!userData) throw new Error('Login data is required.')
    let user = await DatabaseService.getDocumentByUsername(userData.username)
    if (!user)
      throw new Error('We could not find an account by this user name.')

    let isValid = await bcrypt.compare(userData.password, user.hash)
    if (!isValid) throw new Error('Invalid password.')

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET)
    return { user, token }
  }

  register = async (userData) => {
    if (!userData) throw new Error('User data is required for registration')
    userData.hash = await bcrypt.hash(userData.password, 10)

    let user = await DatabaseService.createUser(userData)
    if (!user)
      throw new Error('An error occured while creating new user account.')

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET)

    return { user, token }
  }

  deleteUser = async (userData) => {
    if (!userData)
      throw new Error('User dat ais required for account deletion.')

    let decodedJwt = jwt.verify(userData.token, process.env.JWT_SECRET)
    if (!decodedJwt) throw new Error('Invalid token.')

    let user = await DatabaseService.getDocumentByUsername(decodedJwt.username)
    if (!user)
      throw new Error('An error occured while creating new user account.')

    let deleted = await DatabaseService.deleteDocumentByUsername(
      decodedJwt.username,
    )

    return deleted
  }

  saveNewEntry = async (journalEntry) => {
    // check jwt
    const decodedJwt = jwt.verify(journalEntry.token, process.env.JWT_SECRET)
    if (!decodedJwt) throw new Error('Invalid token.')
    console.log(decodedJwt)
    console.log(journalEntry)

    // save entry to db
    let user = await DatabaseService.getDocumentByUsername(decodedJwt.username)
    if (!user)
      throw new Error('An error occured while creating new user account.')

    await DatabaseService.pushArrayElement(user, 'journalEntries', journalEntry)
    user = await DatabaseService.saveDocument(user)

    return user
  }

  //TODO: create fetchEntryByCriteria when adding pagination

  editEntry = async (journalEntry) => {
    const decodedJwt = jwt.verify(journalEntry.token, process.env.JWT_SECRET)
    if (!decodedJwt) throw new Error('Invalid token.')

    let user = await DatabaseService.getDocumentByUsername(decodedJwt.username)
    if (!user)
      throw new Error('An error occured while creating new user account.')

    await DatabaseService.updateArrayElement(
      user,
      'journalEntries',
      journalEntry,
    )
    user = await DatabaseService.saveDocument(user)

    return user
  }

  deleteEntry = async (journalEntry) => {
    const decodedJwt = jwt.verify(journalEntry.token, process.env.JWT_SECRET)
    if (!decodedJwt) throw new Error('Invalid token.')

    let user = await DatabaseService.getDocumentByUsername(decodedJwt.username)
    if (!user)
      throw new Error('An error occured while creating new user account.')

    await DatabaseService.deleteArrayElement(
      user,
      'journalEntries',
      journalEntry,
    )
    user = await DatabaseService.saveDocument(user)

    return user
  }
}

module.exports = { UserDataService: new UserDataService() }
