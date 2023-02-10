require('dotenv').config()
const express = require('express')
const Router = express.Router()
const { UserDataService } = require('../serviceLayer1/userDataService.js')
const { ServerResponse } = require('../helpers/serverResponse')

const extractErrorMessage = (e) => {
  if (e.message) return `${e.param ? e.param + ': ' : ''}` + e.message; // Default error obj
  if (e._message) return e._message; // Mongoose error obj
  if (e.raw) return e.raw.message;
  return e;
}

Router.post('/login', async (req, res) => {
  try {
    let verified = await UserDataService.verifyUser(req.body)
    if (!verified)
      throw new Error('An error occured during user authentication.')
    res.json(
      new ServerResponse(true, 'User authentication successful', verified),
    )
  } catch (e) {
    console.log(e)
    res.json(new ServerResponse(false, extractErrorMessage(e)))
  }
})

Router.post('/verifyToken', async (req, res) => {
  try {
    let verified = await UserDataService.verifyUser(req.body)
    if (!verified)
      throw new Error('An error occured during user authentication.')
    res.json(
      new ServerResponse(true, 'User authentication successful', verified),
    )
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

Router.post('/register', async (req, res) => {
  try {
    let registered = await UserDataService.register(req.body)
    if (!registered)
      throw new Error('An error occured during user authentication.')
    res.json(
      new ServerResponse(true, 'User authentication successful', registered),
    )
  } catch (e) {
    console.log(e)
    res.json(new ServerResponse(false, extractErrorMessage(e)))
  }
})

Router.post('/deleteUser', async (req, res) => {
  try {
    let deleted = await UserDataService.deleteUser(req.body)
    if (!deleted)
      throw new Error('An error occured during user account deletion.')
    res.json(
      new ServerResponse(true, 'User authentication successful', deleted),
    )
  } catch (e) {
    console.log(e)
    res.json(new ServerResponse(false, extractErrorMessage(e)))
  }
})

Router.post('/saveNewEntry', async (req, res) => {
  try {
    let saved = await UserDataService.saveNewEntry(req.body)
    if (!saved)
      throw new Error('An error occured while saving new journal entry.')

    res.json(new ServerResponse(true, 'New journal entry saved', saved))
  } catch (e) {
    console.log(e)
    res.json(new ServerResponse(false, extractErrorMessage(e)))
  }
})

Router.post('/editEntry', async (req, res) => {
  try{
    let updated = await UserDataService.editEntry(req.body);
    if(!updated) throw new Error('An error occured while saving changes to journal entry.')
    
    console.log(updated);
    res.json(new ServerResponse(true, 'Changes have been saved.', updated))
  }catch{
    console.log(e);
    res.json(new ServerResponse(false, extractErrorMessage(e)))
  }
});

Router.post('/deleteEntry', async (req, res) => {
  try{
    let deleted = await UserDataService.deleteEntry(req.body);
    if(!deleted) throw new Error('An error occured while saving changes to journal entry.')
    
    console.log(deleted);
    res.json(new ServerResponse(true, 'Journal entry has been deleted.', deleted))
  }catch{
    console.log(e);
    res.json(new ServerResponse(false, extractErrorMessage(e)))
  }
});

module.exports = Router
