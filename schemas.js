const mongoose = require('mongoose');

const JournalEntrySchema = {
    date: {type: Date},
    subject: {type: String},
    body: {type: String}
}

const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName:{type: String},
    hash:{type: String},
    journalEntries: [JournalEntrySchema]
})

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}