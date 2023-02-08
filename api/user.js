require('dotenv').config();
const express = require('express');
const Router = express.Router();
const {UserDataService} = require('../serviceLayer1/userDataService.js');
const jwt = require('jsonwebtoken');

Router.post('/login', async (req, res) => {
    try {
        let verified = await UserDataService.verifyUser(req.body);
        if (!verified) throw new Error("An error occured during user authentication.");
        res.json(new ServerResponse(true, 'User authentication successful', { user: verified.user }))
    } catch (e) {
        console.log(e);
        res.json(new ServerResponse(false, extractErrorMessage(e)))
    }
})

module.exports = Router;