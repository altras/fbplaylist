var mongoose = require('mongoose')

test.cleanDB = function (dbName, done) {
  mongoose.connect('localhost', dbName, function (err) {
    if (err) return done(err)
    mongoose.connection.db.dropDatabase(function () {
      mongoose.disconnect(done)
    })
  })
}
