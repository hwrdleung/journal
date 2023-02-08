const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_CONNECT_URL)
.then(() => console.log('Connected to MongoDB \n'));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.raw({ limit: '30mb', extended: true }));

app.use(express.static(path.join(__dirname, '/api')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/api/user', require('./api/user'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, "/client/build/index.html")));

app.listen(5000, () => {
    console.log('Server started on port 5000 \n');
})