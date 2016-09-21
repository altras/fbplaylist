/**
 * define CELL_MODE if not present
 */
process.env.CELL_MODE = process.env.CELL_MODE || '_test'

var path = require('path')
var chai = require('chai')
var $require = require(process.cwd() + '/server/lib/require')
var replacePlaceholders = $require('lib/replace-placeholders')

global.expect = chai.expect

chai.config.includeStack = true

var test = global.test = {}
var variables = test.variables = {
  cell: null,
  dna: null,
  httpendpoint: 'http://127.0.0.1:13371',
  apiendpoint: 'http://127.0.0.1:13371/api',
  uploadsDir: path.join(process.cwd(), '/test/uploads')
}

require('./clean-uploads')
require('./clean-db')

require('./factories')

test.initTestEnv = function (done) {
  var loadDna = require('organic-dna-loader')
  loadDna(function (err, dna) {
    if (err) return done(err)

    replacePlaceholders(dna.fronturls, dna.fronturls)

    test.variables.dna = dna
    test.getToken = $require('lib/jwt-token')(dna.secrets.JWT)

    test.cleanUploads(function (err) {
      if (err) return done(err)
      test.cleanDB(dna.server.database.name, function () {
        process.nextTick(done)
      })
    })
  })
}

test.startServer = function (next) {
  test.initTestEnv(function (err) {
    if (err) return next(err)
    var cell = variables.cell = $require('index').start()
    cell.plasma.on(['ApiRoutesReady', 'SiteRoutesReady'], function (err) {
      if (err instanceof Error) return next(err)
      next && next()
    })
  })
}

test.stopServer = function (next) {
  variables.cell.stop(next)
}

test.connectDB = function (next) {
  test.initTestEnv(function (err) {
    if (err) return next(err)
    var dbName = test.variables.dna.server.database.name
    process.nextTick(function () {
      var mongoose = require('mongoose')
      if (global.Promise) {
        mongoose.Promise = global.Promise
      } else {
        mongoose.Promise = require('bluebird')
      }

      mongoose.connect('localhost', dbName, next)
    })
  })
}

test.disconnectDB = function (next) {
  require('mongoose').disconnect(next)
}
