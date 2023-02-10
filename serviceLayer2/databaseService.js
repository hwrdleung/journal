const { User } = require('../schemas')

class DatabaseService {
  //CREATE
  createUser = async (userData) => {
    let newUser = new User(userData)
    newUser = await newUser.save()
    return newUser
  }

  //READ
  saveDocument = async (document) => await document.save()
  getDocumentByUsername = async (username) =>
    await User.findOne({ username: username })

  //UPDATE
  updateDocument = async (document, update) => await document.updateOne(update)

  pushArrayElement = async (document, propertyName, element) =>
    await document.updateOne({ $push: { [propertyName]: element } })

  updateArrayElement = async (document, propertyName, element) => {
    return await document.update(
      { [`${propertyName}._id`]: element._id },
      { $set: { $: element } },
    )
  }

  //DELETE
  deleteDocumentByUsername = async (username) =>
    await User.findOneAndDelete({ username: username })

  deleteArrayElement = async (document, propertyname, element) => {
    return document.findOneAndDelete({ [`${propertyname}._id`]: element._id })
  }
}

module.exports = { DatabaseService: new DatabaseService() }

/*

$ - Acts as a placeholder to update the first element that matches the query condition
$[] - Acts as a placeholder to update all elements in an array for the documents that match the query condition
$[<identifier>] - Acts as a placeholder to update all elements that match the arrayFilers condition 
                    for the documents that match the query condition

*/
